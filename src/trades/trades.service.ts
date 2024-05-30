import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { getCurrentDate } from '@shared/utils/common.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Trade } from './entites/trade.entity';
import { Repository } from 'typeorm';
import { PoolsService } from '../pools/pools.service';
import { StoreTradeDto } from './dto/store-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class TradesService {
  constructor(
    @InjectRepository(Trade)
    private readonly tradeRepository: Repository<Trade>,
    @Inject(forwardRef(() => PoolsService))
    private readonly poolsService: PoolsService,
  ) {}

  async store(storeTradeDto: StoreTradeDto) {
    // check pool exist
    const pool = await this.poolsService.findById(storeTradeDto.pool_id);
    const trade = await this.tradeRepository.save({
      ...storeTradeDto,
      pool,
    });

    return {
      id: trade.id,
      created_at: trade.created_at,
    };
  }

  async findById(id: number) {
    const trade = await this.tradeRepository.findOneBy({ id });
    if (!trade) {
      throw new NotFoundException(`Trade with id ${id} not found`);
    }

    return trade;
  }

  async update(id: number, updateTradeDto: UpdateTradeDto) {
    const trade = await this.findById(id);
    await this.tradeRepository.update({ id }, { ...updateTradeDto });

    return {
      id: trade.id,
      updated_at: trade.updated_at,
    };
  }

  async remove(id: number) {
    await this.findById(id);
    await this.tradeRepository.delete({ id });

    return {
      id,
      deleted_at: getCurrentDate(),
    };
  }

  async findTradesInPool(
    poolId: number,
    options: IPaginationOptions,
    sort: string,
  ): Promise<Pagination<Trade>> {
    const queryBuilder = this.tradeRepository
      .createQueryBuilder('trade')
      .where('trade.poolId = :poolId', { poolId });
    const [field, order] = sort.split(',');

    if (sort) {
      queryBuilder.orderBy(`trade.${field}`, order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
    }

    return paginate<Trade>(queryBuilder, options);
  }
}
