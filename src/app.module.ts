import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostModule } from './Post/post.module';
import { StudentModule } from './Student/student.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(
            {
                type: 'postgres',
                host: 'localhost',
                port: 8080,
                username: 'postgres',
                password: 'qwerty',
                database: 'volpol',
                entities: ['dist/**/*.entity.js'],
                synchronize: true
            }
        ),
        StudentModule,
        PostModule
    ]
})
export class AppModule {}