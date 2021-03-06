import { Body, Controller, Post } from '@nestjs/common';
import { ClickService } from '../services/click.service';
// import { ClickPayload } from '../interfaces/click-payload.interface';

@Controller()
export class ClickController {
  constructor(private clickService: ClickService) {}

  @Post('customer/transaction/click/prepare')
  async preparePay(@Body() clickPayload) {
    return this.clickService.preparePay(clickPayload);
  }

  @Post('customer/transaction/click/complete')
  async completePay(@Body() clickPayload) {
    return this.clickService.completePay(clickPayload);
  }
}
