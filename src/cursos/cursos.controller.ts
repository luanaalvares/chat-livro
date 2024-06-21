import { Controller, Get, Post, Body, ForbiddenException, Param, Delete, Put, Patch, UseGuards, BadRequestException } from '@nestjs/common';
import { CreateCursoDto } from './create-cursos.dto';
import { CursoService } from './cursos.service';
import { Curso } from './cursos.schema';
import { UpdateCursoDto } from './update-cursos.dto';
import { CursosException } from './cursos.exception';

@Controller('curso')
export class CursoController {
  constructor(private cursoService: CursoService) {}

  @Post()
  async create(@Body() createCursoDto: CreateCursoDto) {
    if(createCursoDto.nome === 'curso de coach')
      throw new CursosException()
    this.cursoService.create(createCursoDto);
  }

  @Get()
  async findAll(): Promise<Curso[]> {
    return this.cursoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cursoService.findOneById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cursoService.delete(id);
  }

  @Put()
  async update(@Body() UpdateCursoDto: UpdateCursoDto) {
    if(UpdateCursoDto.valor === 0)
      throw new BadRequestException('Valor do curso não pode ser 0');
    return await this.cursoService.update(UpdateCursoDto);
  }

}