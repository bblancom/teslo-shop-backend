import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers';
import type { Response } from 'express';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}

  @Get('product/:imageName')
  @ApiResponse({ status: 200, description: 'Product image served successfully' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {

    const path = this.filesService.getStaticProductImage(imageName);

    res.sendFile(path);
  }


  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    // limits: { fileSize: 1000 },
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  @ApiResponse({ status: 201, description: 'Product image uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - invalid image file' })
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {

    if(!file){
      throw new BadRequestException('Make sure the file is an image');
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;

    return {
      secureUrl,
    };
  }
}
