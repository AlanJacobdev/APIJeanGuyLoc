import { Test, TestingModule } from '@nestjs/testing';
import { ActeurService } from './acteur.service';

describe('ActeurService', () => {
  let service: ActeurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActeurService],
    }).compile();

    service = module.get<ActeurService>(ActeurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
