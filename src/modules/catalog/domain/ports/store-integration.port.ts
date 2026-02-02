export abstract class StoreIntegrationPort {
  abstract isStoreActive(storeId: string): Promise<boolean>;
}
