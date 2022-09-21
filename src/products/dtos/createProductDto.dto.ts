export class CreateProductDto {
    name: String;
    description: String;
    stock: Number;
    category: String;
    price: Number;
    images: [String];
    sellerId: String;
    _id?: String;
}