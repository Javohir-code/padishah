import { Controller } from '@nestjs/common';
import { ManageProductsService } from '../services/manage-products.service';

@Controller()
export class ManageProductsController {
  constructor(private manageProductsService: ManageProductsService) {}
}
