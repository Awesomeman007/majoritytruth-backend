import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Contract } from 'src/entities/contract.entity';
import { User } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';

@Module({
    imports: [TypeOrmModule.forFeature([Contract, User, Category])],
    providers: [ContractService],
    controllers: [ContractController],
})
export class ContractModule {}
