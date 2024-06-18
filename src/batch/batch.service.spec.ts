import { Product } from '../products/product.entity';
import { BatchService } from './batch.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingModule, Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

describe('BatchService', () => {
  let service: BatchService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BatchService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BatchService>(BatchService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should update product stock and log start and end times', async () => {
    const updateSpy = jest
      .spyOn(productRepository, 'update')
      .mockResolvedValue({ affected: 10 } as any);
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await service.updateProductStock();

    expect(updateSpy).toHaveBeenCalledWith({}, { stock: 10 });
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('バッチ処理の開始時間は、'),
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '在庫を10に更新しました。処理件数: 10',
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('バッチ処理の終了時間は、'),
    );

    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should log an error if update fails', async () => {
    const error = new Error('Test error');
    jest.spyOn(productRepository, 'update').mockRejectedValue(error);
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await service.updateProductStock();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `バッチ処理中にエラーが発生しました: ${error.message}`,
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('エラー発生時間:'),
    );

    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});
