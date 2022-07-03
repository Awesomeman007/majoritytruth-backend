import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Category } from './category.entity'
import { Comment } from './comment.entity'
import { User } from './user.entity'
import { Vote } from './vote.entity'

@Entity({ name: 'Contract'})
export class Contract {
    @PrimaryGeneratedColumn()
    contractId: number

    @Column()
    creatorId: number

    @Column()
    challengerId: number

    @Column({ type: 'timestamp without time zone'})
    createdDateTime: Date

    @Column({ type: 'timestamp without time zone'})
    expiryDateTime: Date

    @Column()
    contractValue: number 

    @Column()
    contractCurrency: string

    @Column()
    contractStatus: string

    @Column()
    content: string

    @Column()
    likeCount: number

    @Column()
    dislikeCount: number

    @Column()
    creatorAddress: string

    @Column({ nullable: true })
    challengerAddress: string

    @Column()
    createTransactionId: string

    @Column({ nullable: true })
    challengeTransactionId: string

    @ManyToMany((type) => Category, (category) => category.contracts, {
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinTable({
        name: 'Tagged_Category',
        joinColumn: { name: 'contractId', referencedColumnName: 'contractId'},
        inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'categoryId' }
    })
    categories: Category[]

    @OneToMany((type) => Comment, (comment) => comment.contract, {
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
        nullable: false,
    })
    comments: Comment[]

    @OneToMany((type) => Vote, (vote) => vote.contract, {
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
        nullable: false,
    })
    votes: Vote[]

    @ManyToOne((type) => User, (user) => user.userId, {
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'creatorId', referencedColumnName: 'userId'})
    creator: User

    @ManyToOne((type) => User, (user) => user.userId, {
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({ name: 'challengerId', referencedColumnName: 'userId'})
    challenger: User

}