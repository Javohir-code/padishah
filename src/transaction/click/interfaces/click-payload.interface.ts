export interface ClickPayload {
  service_id: number;
  click_trans_id: number;
  merchant_trans_id: string;
  merchant_prepare_id: number;
  merchant_confirm_id?: number;
}
