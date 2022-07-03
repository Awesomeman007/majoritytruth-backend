import { Module } from '@nestjs/common'
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Comment } from './comment.entity'
import { Vote } from './vote.entity'
import { Category } from './category.entity'
import { Contract } from './contract.entity'

@Entity({ name: 'User'})
export class User {
    @PrimaryGeneratedColumn()
    userId: number

    @Column({ nullable: true })
    metamaskKey: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ nullable: true})
    displayName: string

    // @Column({ nullable: true })
    // favouriteCategory: string

    @ManyToMany((type) => Category, (category) => category.users, {
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinTable({
        name: 'Favourite_Category',
        joinColumn: {name: 'userId', referencedColumnName: 'userId'},
        inverseJoinColumn: {name: 'categoryId', referencedColumnName: 'categoryId'}
    })
    categories: Category[]

    // @ManyToMany((type) => Card, (card) => card.users, {
    //     onUpdate: 'NO ACTION',
    //     onDelete: 'CASCADE',
    //     nullable: false,
    // })
    // @JoinTable({
    //     name: 'Comment',
    //     joinColumn: {name: 'user_id', referencedColumnName: 'user_id'},
    //     inverseJoinColumn: {name: 'category_id', referencedColumnName: 'category_id'}
    // })
    // categories: Category[]

    @OneToMany((type) => Comment, (comment) => comment.user, {
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
        nullable: false,
    })
    comments: Comment[]

    @OneToMany((type) => Vote, (vote) => vote.user, {
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
        nullable: false,
    })
    votes: Vote[]

    @OneToMany(() => Contract, (contract) => contract.creatorId)
    createdContracts: Contract[]

    @OneToMany(() => Contract, (contract) => contract.challengerId)
    challengedContracts: Contract[]
}