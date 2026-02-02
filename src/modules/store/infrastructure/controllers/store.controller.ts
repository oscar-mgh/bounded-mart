import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/modules/auth/domain/entities/user.entity';
import { GetUser } from 'src/modules/auth/infrastructure/auth/decorators/get-user.decorator';
import { Roles } from 'src/modules/auth/infrastructure/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/auth/guards/jwt-auth.guard';
import { CreateStoreUseCase } from '../../application/use-cases/create-store.use-case';
import { DeleteStoreUseCase } from '../../application/use-cases/delete-store.use-case';
import { FindStoreByIdUseCase } from '../../application/use-cases/find-store-by-id.use-case';
import { StoreResponseDto } from '../http/dtos/store-response.dto';
import { StoreMapper } from '../persistence/mappers/store.mapper';
import { CreateStoreDto } from './create-store.dto';

@Controller('stores')
@UseGuards(JwtAuthGuard)
export class StoreController {
  constructor(
    private readonly createUseCase: CreateStoreUseCase,
    private readonly findByIdUseCase: FindStoreByIdUseCase,
    private readonly deleteUseCase: DeleteStoreUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateStoreDto, @GetUser('id') userId: string): Promise<StoreResponseDto> {
    const store = await this.createUseCase.execute(dto, userId);
    return StoreMapper.toResponse(store);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string): Promise<StoreResponseDto> {
    const store = await this.findByIdUseCase.execute(id);
    return StoreMapper.toResponse(store);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): Promise<void> {
    return this.deleteUseCase.execute(id);
  }
}
