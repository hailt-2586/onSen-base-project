import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entites/user.entity';
import { StoreUserDto } from './dto/store-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // store
  async store(storeUserDto: StoreUserDto) {
    const isDuplicateWalletAddress = await this.findByWalletAddress(storeUserDto.wallet_address);
    if (isDuplicateWalletAddress) {
      throw new BadRequestException(
        'Wallet address already exists. Please use a different address.',
      );
    }

    try {
      return await this.userRepository.save(storeUserDto);
    } catch (error) {
      console.log(storeUserDto);
      console.log(error);
      throw new BadRequestException('Create user has an error');
    }
  }

  async findByWalletAddress(wallet_address: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: [{ wallet_address }] });
  }
}
