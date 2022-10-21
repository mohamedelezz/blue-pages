import { Roles } from '../auth/roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Body, Controller, Delete, Query, Get, Param, Post, Put, UseGuards, UseInterceptors, ValidationPipe, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestDirectoryService } from './request-directory.service';
import { RequestDirectoryDto } from './dto/request-directory.dto';
import { UpdateRequestDirectoryDto } from './dto/update-request-directory.dto';
import { RolesMeta } from '../auth/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilterRequestDirectoryDto } from './dto/filter-request-directory.dto';

@Controller('request-directory')
@UseGuards(AuthGuard('jwt'))
export class RequestDirectoryController {
  constructor(private requestDirectoryService: RequestDirectoryService) { }

  @Get()
  @RolesMeta(Roles.ADMIN, Roles.USER)
  @UseGuards(RolesGuard)
  async findAll(@Query() filterDto: FilterRequestDirectoryDto): Promise<any> {
    return this.requestDirectoryService.findAll(filterDto);
  }

  @Get('/:id')
  @RolesMeta(Roles.ADMIN, Roles.USER)
  @UseGuards(RolesGuard)
  async findOne(@Param('id') id: number): Promise<any> {
    return this.requestDirectoryService.findOne(id);
  }

  @Post()
  @RolesMeta(Roles.ADMIN, Roles.USER)
  @UseGuards(RolesGuard)
  async create(@Body(ValidationPipe) requestDirectory: RequestDirectoryDto): Promise<any> {
    return this.requestDirectoryService.create(requestDirectory);
  }

  @Put('/:id')
  @RolesMeta(Roles.ADMIN)
  @UseGuards(RolesGuard)
  async update(@Body(ValidationPipe) updateRequestDirectoryDto: UpdateRequestDirectoryDto, @Param('id') id: number): Promise<any> {
    return this.requestDirectoryService.update(updateRequestDirectoryDto, id);
  }

  @Delete('/:id')
  @RolesMeta(Roles.ADMIN)
  @UseGuards(RolesGuard)
  async delete(@Param('id') id: number): Promise<any> {
    return this.requestDirectoryService.delete(id)
  }

}
