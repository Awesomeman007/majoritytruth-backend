import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Category } from './entities/category.entity';
import { Comment } from './entities/comment.entity';
import { Contract } from './entities/contract.entity';
import { User } from './entities/user.entity';
import { Vote } from './entities/vote.entity';

import { UserModule } from './user/user.module';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DBHOST,
        port: 5432,
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        database: 'majority_truth',
        entities: [User, Vote, Category, Contract, Comment],
        synchronize: false,
      })
    }),
    UserModule,
    ContractModule
  ],
  controllers: [AppController],
  // providers: [AppService, ContractService],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
