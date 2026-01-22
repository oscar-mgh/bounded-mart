export interface ApplyDiscountCommand {
  criteria: {
    ids?: string[];
    skus?: string[];
    category?: string;
    isActive?: boolean;
  };
  discountData: { code: string; percentage: number; expirationDate: Date };
}
