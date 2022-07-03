import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Contract } from 'src/entities/contract.entity';
import { getConnection, getManager, Repository } from 'typeorm';
import { CreateContractDto } from './dto/contract.dto';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  private formatDateTime(dateTime: Date) {
    const year = dateTime.getFullYear();
    const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
    const date = ('0' + dateTime.getDate()).slice(-2);
    const hour = ('0' + dateTime.getHours()).slice(-2);
    const minute = ('0' + dateTime.getMinutes()).slice(-2);
    const second = ('0' + dateTime.getSeconds()).slice(-2);

    const formattedDateTime = `${year}-${month}-${date}T${hour}:${minute}:${second}Z`;
    return formattedDateTime;
  }

  async createContract(
    creatorId,
    // categories,
    // createContractDto: Partial<Contract>,
    createContractDto: CreateContractDto,
  ): Promise<any> {
    const currentDateTime = this.formatDateTime(new Date());

    const newContract = this.contractRepository.create({
      creatorId: creatorId,
      // categories: createContractDto.categories,
      content: createContractDto.content,
      contractValue: createContractDto.contractValue,
      contractCurrency: createContractDto.contractCurrency,
      createdDateTime: currentDateTime,
      expiryDateTime: createContractDto.expiryDateTime,
      challengerId: null,
      comments: null,
      contractStatus: 'Open',
      dislikeCount: 0,
      likeCount: 0,
      votes: null,
      creatorAddress: createContractDto.creatorAddress,
      createTransactionId: createContractDto.createTransactionId,
    });

    const contractRes = await this.contractRepository.insert(newContract);
    const contractId = contractRes.raw[0].contractId;
    const contract = await this.contractRepository.findOne({
      where: { contractId: contractId },
      relations: ['categories'],
    });

    const categories = createContractDto.categories;
    if (categories.length) {
      categories.forEach(async (category) => {
        const categoryRes: Category = await this.categoryRepository.findOne({
          where: { title: category },
        });
        contract.categories.push(categoryRes);
      });
      await this.contractRepository.save(contract);
    }

    // const connection = this.contractRepository.createQueryBuilder().connection
    // const queryRunner = connection.createQueryRunner()
    // await queryRunner.startTransaction()
    // try {
    //   await queryRunner.manager.insert(Contract, newContract)
    //   if (categories.length) {
    //     const categories = []
    //     categories.forEach(category => {
    //       const res = this.categoryRepository.find({where: {title: category}})
    //       console.log(res)
    //     })
    //   }
    //   await queryRunner.commitTransaction()
    // } catch (err) {
    //   await queryRunner.rollbackTransaction();
    // } finally {
    //   await queryRunner.release();
    // }

    // return await this.contractRepository.insert(newContract);
  }

  async getContractInExpiryDate(): Promise<any> {
    const contracts = await this.contractRepository.find({
      relations: {
        categories: true,
        challengerId: true,
        creatorId: true,
        comments: true,
        votes: true,
      },
      order: { expiryDateTime: 'ASC', createdDateTime: 'ASC' },
    });

    return contracts;
  }
}
