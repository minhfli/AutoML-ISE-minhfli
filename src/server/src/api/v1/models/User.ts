import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from "typeorm"
import { Time } from "./Time";
import { Project } from "./Project";
import { Run } from "./Run";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string


    @Index()
    @Column({
        nullable: true
    })
    name: string

    @Index()
    @Column({
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

    @Column(() => Time)
    time: Time

    @OneToMany(() => Project, project => project.user, {
        cascade: true
    })
    projects: Project[]

    
}