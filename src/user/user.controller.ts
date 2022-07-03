import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { AuthResponse, CreateUserDto, LoginDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'Sign up successfully',
    type: AuthResponse,
  })
  @ApiConflictResponse({ description: 'Email already exists' })
  @Post('/signup')
  async signup(@Body() signupDto: CreateUserDto): Promise<AuthResponse> {
    const { userId } = await this.userService.createUser(signupDto);
    const token = await this.authService.generateJWT(userId);

    const res: AuthResponse = {
      token: token,
    };

    return res;
  }

  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'Log in successfully', type: AuthResponse })
  @ApiBadRequestResponse({ description: 'Email or password is incorrect' })
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    const { userId } = await this.userService.login(
      loginDto.email,
      loginDto.password,
    );
    const token = await this.authService.generateJWT(userId);
    const res: AuthResponse = {
      token: token,
    };

    return res;
  }

}
