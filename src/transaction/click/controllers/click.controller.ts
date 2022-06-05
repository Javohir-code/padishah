import { Body, Controller, Post } from '@nestjs/common';
import { ClickService } from '../services/click.service';
import { ClickPayload } from '../interfaces/click-payload.interface';

@Controller()
export class ClickController {
  constructor(private clickService: ClickService) {}

  @Post('customer/click/prepare')
  async preparePay(@Body() clickPayload: ClickPayload): Promise<ClickPayload> {
    return this.clickService.preparePay(clickPayload);
  }

  @Post('customer/click/complete')
  async completePay(@Body() clickPayload: ClickPayload) {
    return this.clickService.completePay(clickPayload);
  }
}
