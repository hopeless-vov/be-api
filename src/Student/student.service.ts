import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Student } from './Entity/student.entity';
import { CreateStudentDto } from './DTO/create-student.dto';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) {}

    async getStudents(): Promise<Student[]> {
        return await this.studentRepository.find();
    }

    async registration(createStudentDto: CreateStudentDto): Promise<Student> {
        const newStudent = new Student();

        newStudent.first_name = createStudentDto.firstName;
        newStudent.last_name = createStudentDto.lastName;
        newStudent.age = createStudentDto.age;
        newStudent.group_name = createStudentDto.groupName;
        newStudent.description = createStudentDto.description;
        newStudent.image_url = createStudentDto.imageUrl ? createStudentDto.imageUrl : 'shorturl.at/gsIMT';
        newStudent.email = createStudentDto.email;
        newStudent.password = createStudentDto.password;

        return await this.studentRepository.save(newStudent);
    }

    async login(loginData: { email: string, password: string }): Promise<Student | string> {
        const studentData = await this.studentRepository
            .createQueryBuilder('student')
            .where('email = :email', { email: loginData.email })
            .getOne()
            .catch(() => {
                return undefined;
        });

        if(!studentData || studentData.password != loginData.password) {
            return 'Not correct data';
        } else {
            return studentData;
        }
    }

    async removeAllStudents(): Promise<string> {
        return await this.studentRepository.createQueryBuilder()
                .delete()
                .from(Student)
                .execute()
                .then(() => 'deleted')
                .catch((e) => e);
    }
}