import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AlbumService } from '../lib';

@ApiUseTags('Albums')
@Controller('albums')
export class AlbumsController {
  constructor(private _albums: AlbumService) {}

  @Get()
  all() {
    return this._albums.loadAll();
  }

  @Get(':id')
  single(@Param('id') id: number) {
    return this._albums.loadSingle(id);
  }

  @Post('/import')
  @ApiOperation({
    title: 'Import - You can ignore this operation 😴',
    description: 'This operation is used to migrate articles from an older API.'
  })
  import(@Body() albumsRaw: any[]) {
    albumsRaw.forEach(raw =>
      this._albums.upsert({
        id: raw.id,
        name: raw.name,
        artistId: raw.artist,
        cover: raw.cover,
        coverSmall: raw.cover_small,
        coverMedium: raw.cover_medium,
        coverBig: raw.cover_big,
        coverXl: raw.cover_xl,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      })
    );
  }
}
