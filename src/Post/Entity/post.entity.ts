import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    author_id: number;

    @Column()
    author_name: string;
}