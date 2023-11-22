import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoginDTO } from './dto/login.dto'
import { AuthEntity } from './entity/auth.entity'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDTO) {
    return this.authService.login(email, password)
  }
}
