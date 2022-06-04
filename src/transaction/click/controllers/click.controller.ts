import { Controller, Post, Req, Res } from '@nestjs/common';
import { ClickService } from '../services/click.service';
import { Request, Response } from 'express';

@Controller()
export class ClickController {
  constructor(private clickService: ClickService) {}

  @Post('customer/click/prepare')
  async preparePay(@Req() req: Request, @Res() res: Response) {
    return this.clickService.preparePay(req, res);
  }

  @Post('customer/click/complete')
  async completePay(@Req() req: Request, @Res() res: Response) {
    return await this.clickService.completePay(req, res);
  }
}
