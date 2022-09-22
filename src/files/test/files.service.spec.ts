import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FilesRepository } from '../files.repository';
import { FilesService } from '../files.service';
import { PublicFile } from '../schemas/publicFile.schema';

describe('FilesService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesService, FilesRepository, { provide: getModelToken(PublicFile.name), useValue: jest.fn() }],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
