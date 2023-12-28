import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from "typeorm"
import { Time } from "./Time";
import { Project } from "./Project";
import { Run } from "./Run";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string


    @Index()
    @Column()
    name: string

    @Index()
    @Column()
    email: string

    @Column()
    avatar_url: string

    @Index()
    @Column()
    password: string

    @Column(() => Time)
    time: Time

    @OneToMany(() => Project, project => project.user, {
        cascade: true
    })
    projects: Project[]

    constructor() {
        this.projects = []
    }
}