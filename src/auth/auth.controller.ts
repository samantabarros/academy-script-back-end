import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('auth')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: AuthRequest){
        //o nome da variável tem que ser user
        console.log(req.user);
        //console.log("Chegou aqui controller login")
        return this.authService.login(req.user);
    }
}
