import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm"

@Entity()
export class Time {
    @CreateDateColumn({default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    @UpdateDateColumn({default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updated_at: Date

    @PrimaryGeneratedColumn("uuid")
    id: number


    constructor(){
        this.created_at = new Date()
        this.updated_at = new Date()
    }

}
