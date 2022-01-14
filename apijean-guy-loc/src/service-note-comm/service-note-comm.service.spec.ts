import { Test, TestingModule } from '@nestjs/testing';
import { ServiceNoteCommService } from './service-note-comm.service';

describe('ServiceNoteCommService', () => {
  let service: ServiceNoteCommService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceNoteCommService],
    }).compile();

    service = module.get<ServiceNoteCommService>(ServiceNoteCommService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
