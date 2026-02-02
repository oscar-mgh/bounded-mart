export interface ApplyDiscountCommand {
  criteria: {
    limit?: number;
    page?: number;
    ids?: string[];
    skus?: string[];
    category?: string;
    isActive?: boolean;
  };
  discountData: { code: string; percentage: number; expirationDate: Date };
}
