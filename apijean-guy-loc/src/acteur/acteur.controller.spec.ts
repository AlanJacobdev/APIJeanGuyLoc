import { Test, TestingModule } from '@nestjs/testing';
import { ActeurController } from './acteur.controller';
import { ActeurService } from './acteur.service';

describe('ActeurController', () => {
  let controller: ActeurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActeurController],
      providers: [ActeurService],
    }).compile();

    controller = module.get<ActeurController>(ActeurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
