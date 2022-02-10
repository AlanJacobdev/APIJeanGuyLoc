import { Controller, Get, Param } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get("/:annee/:mois")
  getStatToHome(@Param('annee') annee: number, @Param('mois') mois: string) {
    return this.statsService.getStatToHome(annee, mois);
  }

}
