import { Test, TestingModule } from '@nestjs/testing';
import { RealisateurController } from './realisateur.controller';
import { RealisateurService } from './realisateur.service';

describe('RealisateurController', () => {
  let controller: RealisateurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealisateurController],
      providers: [RealisateurService],
    }).compile();

    controller = module.get<RealisateurController>(RealisateurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
