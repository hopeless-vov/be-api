import { Body, Controller, Delete, Get, Post } from '@nestjs/common';

import { CreateStudentDto } from './DTO/create-student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(
        private readonly studentService: StudentService,
    ) {}

    @Get('all_students')
    getStudents() {
        return this.studentService.getStudents();
    }

    @Post('registration')
    registration(
        @Body() createStudentDto: CreateStudentDto,
    ) {
        return this.studentService.registration(createStudentDto);
    }

    @Post('login')
    login(
        @Body() loginData: {
            email: string,
            password: string
        },
    ) {
        return this.studentService.login(loginData);
    }

    @Delete('delete_all')
    deleteAll(): Promise<string> {
        return this.studentService.removeAllStudents();
    }
}