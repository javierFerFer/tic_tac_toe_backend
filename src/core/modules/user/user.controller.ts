import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { FirebaseRepository } from "../firebase/firebase.service";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {

    constructor(private readonly _userService: UserService,
        private firebasePostRepository: FirebaseRepository) { }

    @Post('check')
    async verifyToken(@Res({ passthrough: true }) response: Response, @Body() data: { token: string }) {

        await this.firebasePostRepository.verifyToken(data.token)
            .then(() => {
                // working here
                response
                    .cookie("access_token", data.token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict'
                    })
            })
            .catch(() => {
                response.status(401)
            })
    }


    @Get('logout')
    logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('access_token');
    }

    // secure example endpoint
    @Get('testCookie')
    testCookie() {
        return {
            message: 'working'
        }
    }


    // @Post()
    // async createUser(@Body() data: User) {
    //     return this._userService.createUser(data);
    // }

}
