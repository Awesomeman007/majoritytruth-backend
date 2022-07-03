import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Contract } from './contract.entity'
import { User } from './user.entity'

@Entity({ name: 'Vote' })
export class Vote {
    @PrimaryColumn({ type: 'timestamp without time zone'})
    dateTime: Date

    @PrimaryColumn()
    voterId: number

    @PrimaryColumn()
    contractId: number

    @Column()
    like: boolean

    @ManyToOne((type) => User, (user) => user.comments, {
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'voterId', referencedColumnName: 'userId' })
    user: User;

    @ManyToOne((type) => Contract, (contract) => contract.comments, {
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'contractId', referencedColumnName: 'contractId' })
    contract: Contract;
}