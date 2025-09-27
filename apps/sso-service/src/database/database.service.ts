import { PrismaClient } from '@prisma/sso-client';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DatabaseService implements OnModuleInit {
  public prisma: PrismaClient;

  async onModuleInit() {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

    await this.prisma.$connect();
  }
}
