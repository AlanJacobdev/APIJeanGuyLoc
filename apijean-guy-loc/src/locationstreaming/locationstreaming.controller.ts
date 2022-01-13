import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { LocationstreamingService } from './locationstreaming.service';
import { CreateLocationstreamingDto } from './dto/create-locationstreaming.dto';
import { UpdateLocationstreamingDto } from './dto/update-locationstreaming.dto';

@Controller('locationstreaming')
export class LocationstreamingController {
  constructor(private readonly locationstreamingService: LocationstreamingService) {}

  @Post()
  create(@Body() createLocationstreamingDto: CreateLocationstreamingDto) {
    return this.locationstreamingService.create(createLocationstreamingDto);
  }

  @Get()
  findAll() {
    return this.locationstreamingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationstreamingService.findOne(+id);
  }

  @Get('/checked/:idFilm/:idUti/:date')
  findIfAlreadyExist(@Param('idFilm') idFilm: string,@Param('idUti') idUti : string, @Param('date') date : Date ) {
    return this.locationstreamingService.findIfAlreadyExist(+idFilm, +idUti, date);
  }
  


  @Put(':id')
  update(@Param('id') id: string, @Body() updateLocationstreamingDto: UpdateLocationstreamingDto) {
    return this.locationstreamingService.update(+id, updateLocationstreamingDto);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationstreamingService.remove(+id);
  }
}
