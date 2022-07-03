import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/auth/jwt.guard';
import { Contract } from 'src/entities/contract.entity';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/contract.dto';

@ApiTags('contract')
@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @UseGuards(UserGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async createContract(
    @Body() createContractDto: CreateContractDto,
    @Req() req,
  ) {
    const userId = req.user.userId;
    // const { categories, ...rest } = createContractDto;
    // return await this.contractService.createContract(userId, categories, rest);
    return await this.contractService.createContract(userId, createContractDto);
  }

  @Get()
  @ApiOkResponse({type: [Contract]})
  async getContracts(
    // @Req() req,
  ) {
    // const userId = req.user.userId;
    // const { categories, ...rest } = createContractDto;
    // return await this.contractService.createContract(userId, categories, rest);
    return await this.contractService.getContractInExpiryDate();
  }
}
