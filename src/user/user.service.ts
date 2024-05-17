import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entites/user.entity';
import { StoreUserDto } from './dto/store-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

    const newUser = await this.userRepository.save(storeUserDto);
    return { user: newUser };
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

    return { user };
  }
}
