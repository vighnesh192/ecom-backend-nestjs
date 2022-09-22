import { ProductStub } from "../test/stubs/products.stub"

export const FilesService = jest.fn().mockReturnValue({
    find: jest.fn().mockResolvedValue([ProductStub()]),
    findOne: jest.fn().mockResolvedValue(ProductStub()),
    createProduct: jest.fn().mockResolvedValue(ProductStub()),
    updateProduct: jest.fn().mockResolvedValue(ProductStub())
})