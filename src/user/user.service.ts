import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/entities/user.entity';
import { Repository, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import {
  DuplicateElementException,
  UserNotFoundException,
} from './user.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async findOne(options: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(options);
    if (!user) throw new UserNotFoundException();
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user;
  }

  async login(email: string, password: string): Promise<{ userId: number }> {
    let user: User;
    try {
      user = await this.findOneByEmail(email);
    } catch {
      throw new BadRequestException('Email or password is incorrect');
    }
    if (!user) throw new BadRequestException('Email or password is incorrect');
    const isPasswordMatched = await this.authService.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordMatched)
      throw new BadRequestException('Email or password is incorrect');

    const res = {
      userId: user.userId as number,
    };
    return res;
  }

  async createUser(dto: CreateUserDto): Promise<{ userId: number }> {
    const existingUser = await this.findOneByEmail(dto.email);
    if (existingUser) throw new DuplicateElementException('Email');
    const hashedPassword = await this.authService.hashPassword(dto.password);
    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
      metamaskKey: '',
    });
    return (await this.userRepository.insert(user)).identifiers.map((i) => ({
      userId: i.userId,
    }))[0];
  }
}
