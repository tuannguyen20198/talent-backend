import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../../database/database.service';
import { LoginDto } from '../auth/dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyTokenDto } from '../auth/dto/verify-token.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: CreateUserDto) {
    const { email } = body;
    const existingUser = await this.databaseService.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.databaseService.prisma.user.create({
      data: body,
    });
    return user;
  }

  async getMe(id: number) {
    const user = await this.databaseService.prisma.user.findUnique({
      where: { id }, // id bây giờ là số => ok
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async login(data: LoginDto) {
    const { email, password } = data;
    let error: string | null = null;
    const user = await this.databaseService.prisma.user.findUnique({
      where: { email },
    });
    if (!user || user.password != password) {
      error = 'Invalid email or password';
      this.logger.log(error);
      throw new UnauthorizedException(error);
    }
    //jwt
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
    };
  }

  async verifyToken(data: VerifyTokenDto) {
    const { token } = data;
    try {
      const decode = await this.jwtService.verifyAsync(token);
      return decode;
    } catch (error) {
      this.logger.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
  async findUserById(userId: number) {
    const user = await this.databaseService.prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  }
}
