import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, Index, PrimaryColumn} from "typeorm"
import {Time} from "./Time";
import {Task} from "./Task";
import {User} from "./User";
import {Run} from "./Run";
import {Model} from "./Model";
import {Dataset} from "./Dataset";
import { ulid } from "ulid";

@Entity()
export class Project {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string

    @Column(
        {
            nullable : true
        }
    )
    description: string

    @Column({
        default: "60"
    })
    trainingTime: string

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


    @OneToMany(() => Dataset, dataset => dataset.project, {
        cascade: true
    })
    datasets: Dataset[]


    // Tạm thời dể như này, cần phải thêm model version
    // make a float column
    @Column({
        type: "float",
        nullable: true,
        default: 0
    })
    validation_accuracy: number
}