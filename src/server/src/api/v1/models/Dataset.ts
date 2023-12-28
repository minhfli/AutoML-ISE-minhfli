import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, Index } from "typeorm"
import { Project } from "./Project";

@Entity()
export class Dataset {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Index()
    @Column()
    bucket_url: string
    
    @Column()
    name: string

    @ManyToOne(() => Project, (project) => project.datasets)
    project: Project

}