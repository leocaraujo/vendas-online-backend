import { categoryMock } from 'src/category/__mocks__/category.mock';
import { UpdateProductDto } from '../dtos/update-product.dto';

export const updateProductMock: UpdateProductDto = {
  categoryId: categoryMock.id,
  name: 'update product mock',
  price: 99,
  image: 'test.jpg',
};
