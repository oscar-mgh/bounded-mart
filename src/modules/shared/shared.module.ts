import { Global, Module } from '@nestjs/common';
import { EntityFinderService } from './application/services/entity-finder.service';

@Global()
@Module({
  providers: [EntityFinderService],
  exports: [EntityFinderService],
})
export class SharedModule {}
