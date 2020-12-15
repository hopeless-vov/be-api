import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Student } from '../Student/Entity/student.entity';
import { Post } from './Entity/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
    imports: [TypeOrmModule.forFeature([Post, Student])],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule {}