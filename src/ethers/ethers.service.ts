import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class EthersService {
  async verifyMessage(message: string, signMessage: string) {
    return ethers.verifyMessage(message, signMessage);
  }

  async signMessage(privateKey: string, message: string) {
    const signer = new ethers.Wallet(privateKey);
    return await signer.signMessage(message);
  }
}
