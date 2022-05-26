import { Controller } from '@nestjs/common';
import { ManageOrdersService } from '../services/manage-orders.service';

@Controller()
export class ManageOrdersController {
  constructor(private manageOrdersService: ManageOrdersService) {}
}
