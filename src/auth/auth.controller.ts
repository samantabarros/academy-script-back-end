import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
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

    @UseGuards(LocalAuthGuard)
    @Get('auth/verify')
    async verifyToken(@Request() req): Promise<any> {
      try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decodedToken = this.authService.verify(token);
        
        // Se chegou até aqui, o token é válido
        return { valid: true, decodedToken };
      } catch (error) {
        // Se houver um erro, o token é inválido
        return { valid: false, error: error.message };
      }
    }
}
