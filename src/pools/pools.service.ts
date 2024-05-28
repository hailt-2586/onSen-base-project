import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pool } from './entites/pool.entity';
import { StorePoolDto } from './dto/store-pool.dto';
import { IPaginationOptions, paginateRaw } from 'nestjs-typeorm-paginate';
import { IPoolFilters } from '@src/pools/pool.interface';

@Injectable()
export class PoolsService {
  constructor(
    @InjectRepository(Pool)
    private readonly poolRepository: Repository<Pool>,
  ) {}

  async store(storePoolDto: StorePoolDto) {
    const pool = await this.poolRepository.save(storePoolDto);
    return {
      id: pool.id,
      created_at: pool.created_at,
    };
  }

  /**
   * All Pool
   * GET /pools?page=1&limit=10
   *
   * Filter by Status
   * GET /pools?page=1&limit=10&status=live
   * GET /pools?page=1&limit=10&status=upcoming
   *
   * Filter by chain
   * GET /pools?page=1&limit=10&chain=Ethereum
   *
   * Search by project_name or contract_address
   * GET /pools?page=1&limit=10&search=Solar
   *
   * Search by field specifics
   * GET /pools?page=1&limit=10&sortBy=created_at,asc
   */
  async findAll(options: IPaginationOptions, filters: IPoolFilters, search: string, sort: string) {
    const queryBuilder = this.poolRepository.createQueryBuilder('pool');
    const { status, chain } = filters;
    const [field, order] = sort.split(',');

    if (status) {
      queryBuilder.andWhere('pool.status = :status', { status });
    }

    if (chain) {
      queryBuilder.andWhere('pool.chain = :chain', { chain });
    }

    if (search) {
      queryBuilder.andWhere('pool.project_name LIKE :search', { search });
    }

    if (sort) {
      queryBuilder.orderBy(`pool.${field}`, order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
    }

    return paginateRaw<Pool>(queryBuilder, options);
  }

  async findPoolWithDetails(id: number) {
    const pool = await this.poolRepository
      .createQueryBuilder('pool')
      .leftJoinAndSelect('pool.poolDetails', 'poolDetails')
      .where('pool.id = :id', { id })
      .getOne();
    if (!pool) {
      throw new NotFoundException(`Pool with ID ${id} not found`);
    }

    return pool;
  }
}
