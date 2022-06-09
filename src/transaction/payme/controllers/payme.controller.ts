import { Controller, Next, Post, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PaymeService } from '../services/payme.service';

@Controller()
export class PaymeController {
  constructor(private paymeService: PaymeService) {}

  @Post('customer/transaction/payme')
  async payme(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction
  ) {
    return await this.paymeService.payMe(req, res, next);
  }
}
