/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
      if (err instanceof AxiosError) {
        console.error('[SSO Error]', {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
          url: err.config?.url,
        });
    
        if (err.response?.status === 400) {
          throw new BadRequestException(err.response.data);
        }
    
        throw new InternalServerErrorException(
          err.response?.data || err.message || 'SSO service error'
        );
      }
    
      console.error('[Unexpected Error]', err);
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
      if (error.response && error.response?.status === 400) {
        throw new BadRequestException(error.response.data);
      }
    
      // Log lỗi chi tiết để debug khi cần
      console.error('SSO login error:', {
        message: error.message,
        code: error.code,
        url: error.config?.url,
      });
    
      throw new Error('SSO service unavailable');
    }
  }
  async verifyToken(data: VerifyTokenRequest) {
    console.log('>>> [BFF] VerifyToken payload =', data);
  
    try {
      const res = await this.authApi.verifyToken({
        verifyTokenRequest: data,
      });
  
      console.log('✅ [BFF] VerifyToken response =', res.data);
      return res.data as { sub: number; email: string };
  
    } catch (error) {
      console.error('❌ [BFF] VerifyToken failed');
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      console.error('URL:', error.config?.url);
      console.error('Message:', error.message);
  
      if (error.response?.status === 400) {
        throw new BadRequestException(error.response.data);
      }
      if (error.response?.status === 401) {
        throw new UnauthorizedException(error.response.data);
      }
  
      throw new InternalServerErrorException('SSO verifyToken unexpected error');
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
  async findUserById(userId: number) {
    try {
      const res = await this.userApi.getUserById({ id: userId });
      console.log('res', res);
      if (!res || !res.data) {
        throw new InternalServerErrorException('Empty response from user API');
      }

      return res.data;
    } catch (error) {
      const status = error?.response?.status;
      const message =
        error?.response?.data?.message || error?.message || 'Unknown error';

      console.error('[SsoClientService] findUserById error:', {
        userId,
        status,
        message,
      });

      if (status === 400) {
        throw new BadRequestException(message);
      }

      if (status === 404) {
        throw new NotFoundException('User not found');
      }

      throw new InternalServerErrorException(
        'Failed to fetch user information',
      );
    }
  }
}
