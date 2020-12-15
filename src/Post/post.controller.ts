import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreatePostDto } from './DTO/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService,
    ) {}

    @Get('get_all')
    getPosts() {
        return this.postService.getPosts();    
    }

    @Get('student_posts/:student_id')
    getStudentPosts(
        @Param('student_id') student_id: number
    ) {
        return this.postService.studentPosts(student_id);
    }

    @Post('create/:student_id')
    createPost(
        @Body() createPostDto: CreatePostDto,
        @Param('student_id') student_id: number
    ) {
        return this.postService.createPost(createPostDto, student_id);
    }

    @Delete('delete/:post_id')
    removePost(
        @Param('post_id') post_id: number
    ) {
        return this.postService.deletePost(post_id);
    }
}