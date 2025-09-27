/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AuthApi,
  CreateUserRequest,
  LoginRequest,
  UserApi,
  VerifyTokenRequest,
} from './client/generated';
import { AxiosError } from 'axios';

@Injectable()
export class SsoClientService {
  constructor(
    private readonly userApi: UserApi,
    private readonly authApi: AuthApi,
  ) {}

  async createUser(data: CreateUserRequest) {
    try {
      const res = await this.userApi.createUser({
        createUserRequest: data,
      });

      return res.data;
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response) {
        if (err.response.status === 400) {
          throw new BadRequestException(err.response.data);
        }
        throw new InternalServerErrorException(err.response.data);
      }
      // fallback for unexpected errors
      throw new InternalServerErrorException('Unexpected error occurred');
    }
  }
  async login(data: LoginRequest) {
    try {
      const res = await this.authApi.login({
        loginRequest: data,
      });
      return res.data;
    } catch (error: any) {
      if (error.response.status === 400) {
        throw new BadRequestException(error.response.data);
      }
      throw error;
    }
  }
  async verifyToken(data: VerifyTokenRequest) {
    console.log('>>> VerifyToken payload =', data);
    try {
      const res = await this.authApi.verifyToken({
        verifyTokenRequest: data, // 👈 dùng luôn data
      });
      console.log('>>> VerifyToken response =', res.data);

      return res.data as { sub: number; email: string };
    } catch (error) {
      if (error.response?.status === 400) {
        throw new BadRequestException(error.response.data);
      }
      if (error.response?.status === 401) {
        throw new UnauthorizedException(error.response.data);
      }
      throw error;
    }
  }

  async getMe(token: string) {
    const response = await this.userApi.getMe(
      {}, // nếu getMe không nhận params thì truyền object rỗng
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }
}
