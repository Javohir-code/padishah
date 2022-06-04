export interface ClickPayload {
  service_id: number;
  click_trans_id: number;
  merchant_trans_id: string;
  merchant_prepare_id: number;
  merchant_confirm_id?: number;
  sign_time?: string;
  sign_string?: string;
  click_paydoc_id?: number;
  amount: number;
  error?: any;
}
