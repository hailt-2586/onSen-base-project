import { PartialType } from '@nestjs/mapped-types';
import { StorePoolDetailsDto } from './store-pool-details.dto';

export class UpdatePoolDetailsDto extends PartialType(StorePoolDetailsDto) {}
