import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: { name },
    });
    if (!category) {
      throw new NotFoundException(`Category with name ${name} not found`);
    }
    return category;
  }

  async findCategoryById(categoryId: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }
    return category;
  }

  async findAllCategories() {
    const categories = await this.categoryRepository.find();
    if (!categories || categories.length === 0) {
      throw new NotFoundException('Categories not found');
    }
    return categories;
  }

  async createCategory(
    createCategory: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const category = await this.findCategoryByName(createCategory.name).catch(
      () => undefined,
    );
    if (category) {
      throw new NotFoundException(
        `Category with name ${createCategory.name} already exists`,
      );
    }
    return this.categoryRepository.save(createCategory);
  }
}
