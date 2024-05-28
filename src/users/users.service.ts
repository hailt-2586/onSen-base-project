import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entites/user.entity';
import { StoreUserDto } from './dto/store-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getCurrentDate } from '../../shared/utils/common.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async store(storeUserDto: StoreUserDto) {
    const isDuplicateWalletAddress = await this.userRepository.findOneBy({
      wallet_address: storeUserDto.wallet_address,
    });
    if (isDuplicateWalletAddress) {
      throw new BadRequestException(
        'Wallet address already exists. Please use a different address.',
      );
    }

    const user = await this.userRepository.save(storeUserDto);
    return {
      wallet_address: user.wallet_address,
      created_at: user.created_at,
    };
  }

  async findByWalletAddress(wallet_address: string) {
    return await this.userRepository.findOneBy({ wallet_address });
  }

  async update(wallet_address: string, updateUserDto: UpdateUserDto) {
    const user = await this.findByWalletAddress(wallet_address);
    if (!user) {
      throw new BadRequestException("Oops! Looks like that user doesn't exist.");
    }

    await this.userRepository.update({ wallet_address }, { ...updateUserDto });

    return {
      wallet_address: user.wallet_address,
      updated_at: user.updated_at,
    };
  }

  async remove(wallet_address: string) {
    const user = await this.findByWalletAddress(wallet_address);
    if (!user) {
      throw new BadRequestException("Oops! Looks like that user doesn't exist.");
    }

    await this.userRepository.delete({ wallet_address });

    return {
      wallet_address,
      deleted_at: getCurrentDate(),
    };
  }
}
