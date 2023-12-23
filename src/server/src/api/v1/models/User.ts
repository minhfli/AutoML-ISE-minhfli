import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import {Time} from "./Time";
import {Project} from "./Project";
import {Run} from "./Run";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    avatar_url: string

    @Column()
    password: string

    @Column(() => Time)
    time: Time

    @OneToMany(() => Project, project => project.user, {
        cascade: true
    })
    projects: Project[]



}