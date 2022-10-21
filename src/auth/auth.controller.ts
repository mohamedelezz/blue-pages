import { Body, Controller, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserInterface } from './interfaces/register.interface';
import { RegisterDto } from './dto/register.dto';
import { ValidationPipe } from '@nestjs/common';
import{LoginDto} from './dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    register(@Body(ValidationPipe) user: RegisterDto): Promise<void> {
        return this.authService.registrationAccount(user);
    }

    @Post('/login')
    login(@Body() user: LoginDto): Observable<{ token: string }> {
        return this.authService.login(user).pipe(map((jwt: string) => ({ token: jwt })))
    }
	
}
