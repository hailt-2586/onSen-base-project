import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pool } from './entites/pool.entity';
import { StorePoolDto } from './dto/store-pool.dto';
import { PaginationDto } from './dto/pagination.dto';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class PoolsService {
  constructor(
    @InjectRepository(Pool)
    private readonly poolRepository: Repository<Pool>,
  ) {}

  async store(storePoolDto: StorePoolDto) {
    const newPool = await this.poolRepository.save(storePoolDto);
    return { pool: newPool };
  }

  /**
   * All Pool
   * GET /pools?page=1&limit=10
   *
   * Filter by Status
   * GET /pools?page=1&limit=10&status=live
   * GET /pools?page=1&limit=10&status=upcoming
   * GET /pools?page=1&limit=10&status=completed
   *
   * Filter by chain
   * GET /pools?page=1&limit=10&chain=Ethereum
   *
   * Search by project_name or contract_address
   * GET /pools?page=1&limit=10&search=Solar
   *
   * Search by field specifics
   * GET /pools?page=1&limit=10&sortBy=funds_raised
   */
  async findAll(options: PaginationDto): Promise<Pagination<Pool>> {
    const queryBuilder = this.poolRepository.createQueryBuilder('pool');

    if (options.status) {
      queryBuilder.andWhere('pool.status = :status', { status: options.status });
    }

    if (options.chain) {
      queryBuilder.andWhere('pool.chain = :chain', { chain: options.chain });
    }

    if (options.search) {
      queryBuilder.andWhere(
        'pool.project_name LIKE :search OR pool.contract_address LIKE :search',
        {
          search: `%${options.search}%`,
        },
      );
    }

    if (options.sortBy) {
      queryBuilder.orderBy(`pool.${options.sortBy}`, 'ASC');
    }

    return paginate<Pool>(queryBuilder, options);
  }

  async findOne(id: number) {
    const pool = await this.poolRepository.findOneBy({ id });
    if (!pool) {
      throw new NotFoundException(`Pool with ID ${id} not found`);
    }
    return pool;
  }
}
