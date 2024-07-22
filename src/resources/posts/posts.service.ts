import { BadRequestException, Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  createPost(post: Pick<Post, 'title' | 'content' | 'authorId'>) {
    try {
      const result = this.prismaService.post.create({
        data: post,
        select: {
          authorId: false,
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          author: { select: { id: true, username: true } },
        },
      });
      if (result) {
        return result;
      } else throw new BadRequestException('Could not create post');
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  async findAll(authorId: number) {
    try {
      const posts = await this.prismaService.post.findMany({
        where: { authorId },
        select: {
          authorId: false,
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          author: { select: { id: true, username: true } },
        },
      });

      return posts;
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  updatePost(
    id: number,
    authorId: number,
    post: Pick<Post, 'title' | 'content'>,
  ) {
    try {
      const result = this.prismaService.post.update({
        where: { id, authorId },
        data: post,
        select: {
          authorId: false,
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          author: { select: { id: true, username: true } },
        },
      });
      if (result) {
        return result;
      } else throw new BadRequestException('Could not update post');
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }

  remove(id: number, authorId: number) {
    try {
      const result = this.prismaService.post.delete({
        where: { id, authorId },
      });
      if (result) {
        return result;
      } else throw new BadRequestException('Could not delete post');
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }
}
