export interface IOrder {
  productId: number;
  categoryId: number;
  subCategoryId: number;
  storeId: number;
  storeName: string;
  description: string;
  photos: Array<string>;
  keys: Array<string>;
  colors: Array<string>;
  vendorCode: number;
  productName: string;
  gender: string;
  msisdn: string;
  telegram: string;
  storeAddress: Array<string>;
  deliveryCost: number;
  remainProducts: number;
  price: number;
  salePrice?: number;
  size: Array<number>;
  material: string;
  manufacturerCountry: string;
  metadata?: string;
  quantity?: number;
  createdAt: string;
}
