import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'
import { Contract } from './contract.entity'
import { User } from './user.entity'

@Entity({ name: 'Comment' })
export class Comment {
    @PrimaryColumn({ type: 'timestamp without time zone'})
    dateTime: Date

    @Column()
    comment: string

    @ManyToOne((type) => User, (user) => user.comments, {
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
    user: User;

    @ManyToOne((type) => Contract, (contract) => contract.comments, {
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'contractId', referencedColumnName: 'contractId' })
    contract: User;
}