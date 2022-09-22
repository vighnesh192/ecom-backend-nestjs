import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FilesRepository } from '../../files/files.repository';
import { FilesService } from '../../files/files.service';
import { PublicFile } from '../../files/schemas/publicFile.schema';
import { ProductsRepository } from '../products.repository';
import { ProductsService } from '../products.service';
import { Product } from '../schemas/product.schema';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, FilesService, ProductsRepository, FilesRepository,
        { provide: getModelToken(Product.name), useValue: jest.fn() },
        { provide: getModelToken(PublicFile.name), useValue: jest.fn() }
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
