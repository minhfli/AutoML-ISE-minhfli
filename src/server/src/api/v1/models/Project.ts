import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, Index} from "typeorm"
import {Time} from "./Time";
import {Task} from "./Task";
import {User} from "./User";
import {Run} from "./Run";
import {Model} from "./Model";
import {Dataset} from "./Dataset";

@Entity()
export class Project {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Index()
    @Column({
        type: "enum",
        enum: Task,
        default: Task.IMAGE_CLASSIFICATION
    })
    task: Task

    @Column(() => Time)
    time: Time

    @ManyToOne(() => User, (user) => user.projects)
    user: User

    @OneToMany(() => Run, run => run.project, {
        cascade: true
    })
    runs: Run[]

    @OneToMany(() => Model, model => model.project, {
        cascade: true
    })
    models: Model[]

    @OneToMany(() => Dataset, dataset => dataset.project, {
        cascade: true
    })
    datasets: Dataset[]

    constructor(){
        this.runs = []
        this.models = []
        this.datasets = []
    }
}