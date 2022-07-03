import { Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Contract } from './contract.entity'
import { User } from './user.entity'

@Entity({ name: 'Category'})
export class Category {
    @PrimaryGeneratedColumn()
    categoryId: number

    @Column()
    title: string

    @ManyToMany((type) => User, (user) => user.categories, {
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
        nullable: false
    })
    users: User[]

    @ManyToMany((type) => Contract, (contract) => contract.categories, {
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
        nullable: false
    })
    contracts: Contract[]
}