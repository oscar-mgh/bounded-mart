import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from '../../application/dtos/login.dto';
import { RegisterUserDto } from '../../application/dtos/register-user.dto';
import { UserResponseDto } from '../../application/dtos/user-response.dto';
import { LoginUseCase } from '../../application/use-cases/login-user.use-case';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { TokenService } from '../auth/services/token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly tokenService: TokenService,
  ) { }

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
