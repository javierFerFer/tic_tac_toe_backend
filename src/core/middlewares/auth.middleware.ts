
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { FirebaseRepository } from '../modules/firebase/firebase.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private firebasePostRepository: FirebaseRepository){
        
    }

    // check access_token as cookie
    async use(req: Request, res: Response, next: NextFunction) {

        const { access_token } = req.cookies;
        if (access_token) {
            await this.firebasePostRepository.verifyToken(access_token)
            .then(() => {
                next();
            })
            .catch(() => {
                throw new UnauthorizedException(); 
            });
        } else {
            throw new UnauthorizedException(); 
        }
        


    }
}
