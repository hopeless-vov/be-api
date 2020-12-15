import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';

import { Student } from '../Student/Entity/student.entity';
import { CreatePostDto } from './DTO/create-post.dto';
import { Post } from './Entity/post.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>
    ) {}

    async getPosts(): Promise<Post[]> {
        return await this.postRepository.find();
    }

    async createPost(createPostDto: CreatePostDto, student_id: number): Promise<Post> {
        const newPost = new Post();
        const author = await this.studentRepository
            .createQueryBuilder('student')
            .where('id = :id', { id: student_id })
            .getOne()
            .catch(() => {
                return undefined;
            });

        newPost.author_id = student_id;
        newPost.author_name = `${author.first_name} ${author.last_name}`;
        newPost.title = createPostDto.title;
        newPost.text = createPostDto.text;

        return await this.postRepository.save(newPost);
    }

    async deletePost(post_id: number): Promise<string> {
        return await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Post)
            .where('id = :id', { id: post_id })
            .execute()
            .then((data) => {
                if(data.affected !== 0) {
                    return 'Deleted';
                } else {
                    return 'Not Correct data';
                }
            })
    }

    async studentPosts(student_id: number): Promise<Post[]> {
        return await this.postRepository.createQueryBuilder()
            .where('author_id = :id', { id: student_id })
            .getMany();
    }
}