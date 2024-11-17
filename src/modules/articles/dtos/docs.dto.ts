import { ApiProperty } from '@nestjs/swagger';

export class ArticleDocs {
  @ApiProperty({ description: 'The ID of the article' })
  id: number;

  @ApiProperty({ description: 'The title of the article' })
  title: string;

  @ApiProperty({ description: 'The content of the article' })
  content: string;

  @ApiProperty({ description: 'The creator ID of the article' })
  creatorId: number;
}
