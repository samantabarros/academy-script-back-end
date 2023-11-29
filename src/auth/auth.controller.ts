import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    //@UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: AuthRequest){
        //usuario não está chegando aqui (undefined)
        console.log(req.usuario);
        return this.authService.login(req.usuario);
    }
}
