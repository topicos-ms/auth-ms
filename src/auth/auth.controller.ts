import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from './dto';
import type { JwtPayload } from './interfaces';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register')
  register(@Payload() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @MessagePattern('auth.login')
  login(@Payload() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @MessagePattern('auth.get-users')
  findAllUsers() {
    return this.authService.findAllUsers();
  }

  @MessagePattern('auth.update-user')
  updateUser(
    @Payload()
    payload: {
      userId: string;
      updateUserDto: UpdateUserDto;
    },
  ) {
    return this.authService.update(payload.userId, payload.updateUserDto);
  }

  @MessagePattern('auth.change-password')
  changePassword(
    @Payload()
    payload: {
      userId: string;
      changePasswordDto: ChangePasswordDto;
    },
  ) {
    return this.authService.changePassword(payload.userId, payload.changePasswordDto);
  }

  @MessagePattern('auth.logout')
  logout(
    @Payload()
    payload: {
      jti: string;
      exp: number;
    },
  ) {
    return this.authService.logout(payload.jti, payload.exp);
  }

  @MessagePattern('auth.logout-all')
  logoutAll(@Payload() payload: { userId: string }) {
    return this.authService.logoutAll(payload.userId);
  }

  @MessagePattern('auth.refresh-token')
  refreshToken(@Payload() payload: JwtPayload) {
    const userLike = {
      id: payload.id,
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name,
      phone: payload.phone,
      user_type: payload.role,
    } as any;

    return this.authService.checkAuthStatus(userLike);
  }

  @MessagePattern('auth.validate-token')
  validateToken(@Payload() payload: { token: string }) {
    return this.authService.validateToken(payload.token);
  }

  @MessagePattern('auth.clearTestData')
  clearTestData() {
    return this.authService.clearTestData();
  }
}