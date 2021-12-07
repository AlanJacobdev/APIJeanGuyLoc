import { Test, TestingModule } from '@nestjs/testing';
import { RealisateurService } from './realisateur.service';

describe('RealisateurService', () => {
  let service: RealisateurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealisateurService],
    }).compile();

    service = module.get<RealisateurService>(RealisateurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
