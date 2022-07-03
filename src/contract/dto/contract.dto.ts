import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsDateString, IsNegative, IsNumber, IsString } from "class-validator";

export class CreateContractDto {

    @ApiProperty()
    @IsDateString()
    expiryDateTime: Date

    @ApiProperty()
    @IsNumber()
    contractValue: number

    @ApiProperty()
    @IsString()
    contractCurrency: string

    @ApiProperty()
    @IsString()
    content: string

    @ApiProperty()
    @IsArray()
    categories: string[]

    @ApiProperty()
    @IsString()
    creatorAddress: string

    @ApiProperty()
    @IsString()
    createTransactionId: string
}