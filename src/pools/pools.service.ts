import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pool } from './entites/pool.entity';
import { StorePoolDto } from './dto/store-pool.dto';
import { IPaginationOptions, paginateRaw } from 'nestjs-typeorm-paginate';
import { PricesService } from '../prices/prices.service';
import { IPoolFilters } from './pool.interface';
import { PriceHistoryService } from '../price_history/price_history.service';
import { getCurrentDate } from '@shared/utils/common.util';
import { TeamMembersService } from '../team_members/team_members.service';
import { EcosystemsService } from '../ecosystems/ecosystems.service';
import { PoolDetailsService } from '../pool_details/pool_details.service';

@Injectable()
export class PoolsService {
  constructor(
    @InjectRepository(Pool)
    private readonly poolRepository: Repository<Pool>,
    @Inject(forwardRef(() => PricesService))
    private readonly pricesService: PricesService,
    @Inject(forwardRef(() => PriceHistoryService))
    private readonly priceHistoryService: PriceHistoryService,
    @Inject(forwardRef(() => TeamMembersService))
    private readonly teamMembersService: TeamMembersService,
    @Inject(forwardRef(() => EcosystemsService))
    private readonly ecosystemsService: EcosystemsService,
    @Inject(forwardRef(() => PoolDetailsService))
    private readonly poolDetailsService: PoolDetailsService,
  ) {}

  async store(storePoolDto: StorePoolDto) {
    const pool = await this.poolRepository.save(storePoolDto);

    // Create base price after create pool
    await this.pricesService.store({
      pool_id: pool.id,
      current_price: 0,
      market_cap: 0,
      liquidity: 0,
      pool_value: 0,
      fdv: 0,
      volume: 0,
    });

    // Create base price history after create pool
    await this.priceHistoryService.store({
      pool_id: pool.id,
      date: getCurrentDate() as unknown as Date,
      price: 0,
    });

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

  async findById(id: number) {
    const pool = await this.poolRepository.findOneBy({ id });
    if (!pool) {
      throw new NotFoundException(`Pool with id ${id} not found`);
    }

    return pool;
  }

  async findPoolWithInformation(id: number) {
    return await this.poolRepository.findOne({
      where: { id },
      relations: ['prices', 'price_histories', 'team_members', 'ecosystems'],
    });
  }

  async findPoolWithDetails(id: number) {
    return await this.poolRepository.findOne({
      where: { id },
      relations: ['details'],
    });
  }
}
