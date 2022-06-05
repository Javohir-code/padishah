export interface ClickPayload {
  click_trans_id: string;
  service_id: string;
  merchant_trans_id: string;
  merchant_prepare_id?: string;
  merchant_confirm_id?: string;
  amount: string;
  action: string;
  error?: string;
  error_note: string;
  sign_time?: string;
  sign_string?: string;
  click_paydoc_id?: string;
}
