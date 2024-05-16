import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { StoreUserDto } from './dto/store-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // store
  async store(data: StoreUserDto): Promise<{
    id: number;
    public_address: string;
    nonce: string;
  }> {
    const { public_address, nonce } = data;

    try {
      const user = new User();
      user.public_address = public_address;
      user.nonce = nonce;
      const newUser = await this.userRepository.save(user);
      return {
        id: newUser.id,
        public_address: newUser.public_address,
        nonce: newUser.nonce,
      }
    } catch (error) {
      console.log(data);
      console.log(error);
      throw new BadRequestException('Create user has an error');
    }
  }

  async findBypublic_address(public_address: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: [{ public_address }] });
  }
}
