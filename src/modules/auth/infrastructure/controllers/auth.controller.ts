import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginUseCase } from '../../application/use-cases/login-user.use-case';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { TokenService } from '../auth/services/token.service';
import { LoginDto } from '../http/dtos/login.dto';
import { RegisterUserDto } from '../http/dtos/register-user.dto';
import { UserResponseDto } from '../http/dtos/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly tokenService: TokenService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterUserDto): Promise<UserResponseDto & { token: string }> {
    const user = await this.registerUserUseCase.execute(dto);
    const token = this.tokenService.generateToken(user);
    return { ...UserResponseDto.fromDomain(user), token: token.access_token };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto): Promise<UserResponseDto & { token: string }> {
    const user = await this.loginUseCase.execute(dto);
    const token = this.tokenService.generateToken(user);
    return { ...UserResponseDto.fromDomain(user), token: token.access_token };
  }
}
