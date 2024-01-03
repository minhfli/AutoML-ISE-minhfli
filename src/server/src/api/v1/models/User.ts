import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index, PrimaryColumn } from "typeorm"
import { Time } from "./Time";
import { Project } from "./Project";
import { Run } from "./Run";
import { ulid } from "ulid";

@Entity()
export class User {
    @PrimaryColumn({
        type: 'varchar',
        default: () => `'${ulid()}'`
    })
    id: string;


    @Index()
    @Column({
        nullable: true
    })
    name: string

    @Index()
    @Column({
        unique : true,
        nullable: true
    })
    email: string

    @Column({
        nullable: true
    })
    avatar_url: string

    @Index()
    @Column({
        nullable: true
    })
    password: string


    @OneToMany(() => Project, project => project.user, {
        cascade: true
    })
    projects: Project[]

    
}