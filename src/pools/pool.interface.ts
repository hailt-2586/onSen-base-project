import { E_STATUS } from '@shared/enums/common.enum';

export interface IPoolFilters {
  status?: E_STATUS | string;
  chain?: string;
}

export interface IPoolSocialLink {
  name: string;
  url: string;
}
