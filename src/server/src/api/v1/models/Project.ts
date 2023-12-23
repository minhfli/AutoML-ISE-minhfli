import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm"
import {Time} from "./Time";
import {Task} from "./Task";
import {User} from "./User";
import {Run} from "./Run";
import {Model} from "./Model";
import {Dataset} from "./Dataset";

@Entity()
export class Project {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    name: string

    @Column()
    description: string

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
}