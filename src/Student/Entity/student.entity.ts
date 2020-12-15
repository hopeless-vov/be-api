import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('student')
export class Student {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    age: number;

    @Column()
    group_name: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    image_url: string;

    @Column({ default: 0 })
    posts_number: number;

    @Column()
    email: string;

    @Column()
    password: string;
}