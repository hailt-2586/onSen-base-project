import { BadRequestException, Injectable } from '@nestjs/common';
import ms from 'ms';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EthersService } from '../ethers/ethers.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entites/user.entity';
import { IAuth } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private ethersService: EthersService,
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const signMessage = await this.ethersService.signMessage(
      loginDto.private_key,
      loginDto.message,
    );
    const verifyMessage = await this.ethersService.verifyMessage(loginDto.message, signMessage);
    if (!verifyMessage) {
      throw new BadRequestException(
        'Message verification failed. Please ensure that the provided signature and message are correct.',
      );
    }

    let user = await this.usersService.findByWalletAddress(loginDto.wallet_address);
    if (!user) {
      const userStore = await this.usersService.store({
        username: loginDto.wallet_address.substring(0, 5),
        wallet_address: loginDto.wallet_address,
        signature: signMessage,
      });

      user = await this.usersService.findByWalletAddress(userStore.wallet_address);
    }

    return await this.generateToken(user);
  }

  generateToken = async (user: User) => {
    const { username, wallet_address, signature } = user;
    const payload: IAuth = { username, wallet_address, signature };
    const expires_in = ms(this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION')) / 1000;

    return {
      access_token: this.jwtService.sign(payload),
      expires_in,
      user: payload,
    };
  };
}
