import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuarioService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(username);
    var passwordMatch = await bcrypt.compare(pass, user.senha)

    if (passwordMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email, username: user.nome };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}