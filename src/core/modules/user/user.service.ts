import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    
    constructor(private readonly _prisma: PrismaService) {}

    getAllUsers(): Promise<User[]> {
        return this._prisma.user.findMany();
    }

    createUser(data: User) {
        return this._prisma.user.create({
            data
        })
    }
}
