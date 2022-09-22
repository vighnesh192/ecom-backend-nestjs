import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FilesRepository } from '../../files/files.repository';
import { FilesService } from '../../files/files.service';
import { PublicFile } from '../../files/schemas/publicFile.schema';
import { ProductsController } from '../products.controller';
import { ProductsRepository } from '../products.repository';
import { ProductsService } from '../products.service';
import { Product } from '../schemas/product.schema';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, ProductsRepository, FilesService, FilesRepository,
        { provide: getModelToken(Product.name), useValue: jest.fn() },
        { provide: getModelToken(PublicFile.name), useValue: jest.fn() }
      ],
      controllers: [ProductsController],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
