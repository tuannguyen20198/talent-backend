import { PrismaClient } from '@prisma/sso-client';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DatabaseService implements OnModuleInit {
  public prisma: PrismaClient;

  async onModuleInit() {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url:
            process.env.DATABASE_URL ||
            'postgresql://user:password@localhost:5432/nnpp?schema=public',
        },
      },
    });

    await this.prisma.$connect();
  }
}
