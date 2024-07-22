import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Response } from 'express';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { PostIdDto } from './dto/post-id.dto';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Body() postDto: CreatePostDto,
    @Request() req: any,
    @Res() res: Response,
  ) {
    try {
      return this.postsService
        .createPost({ ...postDto, authorId: req.user })
        .then((result) => {
          return res.status(HttpStatus.CREATED).json({
            message: 'Post created successfully',
            data: { post: result },
          });
        });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Get()
  findAll(@Request() req: any, @Res() res: Response) {
    try {
      return this.postsService.findAll(req.user).then((result) => {
        return res.status(HttpStatus.CREATED).json({
          message: 'Post created successfully',
          data: { posts: result },
        });
      });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Patch(':id')
  update(
    @Param() _param: PostIdDto, // for validation only
    @Param('id', ParseIntPipe) id: number,
    @Body() postDto: UpdatePostDto,
    @Request() req: any,
    @Res() res: Response,
  ) {
    try {
      return this.postsService
        .updatePost(id, req.user, { ...postDto })
        .then((result) => {
          return res.status(HttpStatus.OK).json({
            message: 'Post updated successfully',
            data: { post: result },
          });
        });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Delete(':id')
  remove(
    @Param() _param: PostIdDto, // for validation only
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
    @Res() res: Response,
  ) {
    try {
      return this.postsService.remove(id, req.user).then((result) => {
        return res.status(HttpStatus.OK).json({
          message: 'Post deleted successfully',
          data: { post: result },
        });
      });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }
}
