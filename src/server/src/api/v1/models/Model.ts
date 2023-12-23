import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm"
import {Project} from "./Project";

@Entity()
export class Model {
    @PrimaryGeneratedColumn("uuid")
    id: number
    @Column()
    name: string
    @Column()
    description: string
    @Column()
    status: string
    @Column()
    url: string

    @ManyToOne(() => Project, project => project)
    project: Project

}