import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, OneToOne, JoinColumn} from "typeorm"
import {User} from "./User";
import {Project} from "./Project";
import { ulid } from "ulid";
import { Model } from './Model';

@Entity()
export class Run {
    @PrimaryGeneratedColumn("uuid")
    id: string;

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

    @OneToOne(() => Model, (model) => model.run, {cascade: true, eager: true, onDelete: 'CASCADE'})
    @JoinColumn()
    model: Model
}