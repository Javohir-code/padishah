export interface IOrder {
  productId: number;
  categoryId: number;
  subCategoryId: number;
  storeId: number;
  storeName: string;
  photos: string;
  keys: string;
  colors: string;
  vendorCode: number;
  productName: string;
  gender: string;
  msisdn: string;
  telegram: string;
  storeAddress: string;
  deliveryCost: number;
  remainProducts: number;
  price: number;
  size: string;
  material: string;
  manufacturerCountry: string;
  metadata?: string;
  quantity?: number;
  createdAt: string;
}
