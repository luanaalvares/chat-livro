import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioInterface } from './interfaces/usuario.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './schemas/usuario.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>){}
  
  usuario: UsuarioInterface;

  async create(createUsuarioDto: CreateUsuarioDto) {
    createUsuarioDto.senha = await this.generateHash(createUsuarioDto.senha);
    const createdUser = new this.usuarioModel(createUsuarioDto);
    return createdUser.save();
  }

  findAll(){
    return this.usuarioModel.find().select('-senha').exec();
  }

  findOne(id: string): Promise<Usuario> {
    return this.usuarioModel.findById(id).select('-senha').exec();
  }

  findByEmail(email: string): Promise<Usuario> {
    return this.usuarioModel.findOne({email: email}).exec();
  }


  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioModel.findByIdAndUpdate(id, updateUsuarioDto).exec();
  }

  remove(id: number) {
    return this.usuarioModel.findByIdAndDelete(id).exec();
  }

  private async generateHash(senha: string){
    const saltOrRounds = 10;
    const password = 'random_password';
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }
}
