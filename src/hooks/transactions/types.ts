export type Transaction = Partial<{
  type: string;
  date: string;
  status: string;
  amount: number;
  payment_reference: string;
  metadata: Partial<{
    name: string;
    type: string;
    email: string;
    country: string;
    quantity: string;
    product_name: string;
  }>;
}>;