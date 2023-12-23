import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne} from "typeorm"
import {Project} from "./Project";

@Entity()
export class Dataset {
    @PrimaryGeneratedColumn("uuid")
    id: number
    @Column()
    bucket_url: string
    @Column()
    name: string
    @ManyToOne(() => Project, (project) => project.datasets)
    project: Project

}