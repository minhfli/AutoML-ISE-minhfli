import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import {User} from "./User";
import {Project} from "./Project";

@Entity()
export class Run {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    status: string

    @Column()
    best_model_url: string

    @Column()
    train_accuracy: number

    @Column()
    train_loss: number

    @Column()
    val_accuracy: number

    @Column()
    val_loss: number

    @ManyToOne(() => Project, project => project.runs)
    project: Project
}