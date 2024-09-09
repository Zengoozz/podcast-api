import { Test, TestingModule } from '@nestjs/testing';
import { EposidesController } from './eposides.controller';
import { EposidesService } from './eposides.service';

describe('EposidesController', () => {
  let controller: EposidesController;

  const mockFindById = jest.fn();

  const mockEposidesService = {
    findAll: async () => [{ id: 'id' }],
    findFeatured: async () => [{ id: 'id' }],
    findById: mockFindById,
    create: async () => ({ id: 'id' }),
  }

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EposidesController],
      providers: [{ provide: EposidesService, useValue: mockEposidesService }]
    }).compile();

    controller = module.get<EposidesController>(EposidesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findById', () => {
    describe('when eposide is found', () => {
      const epId = 'id';
      const mockResult = { id: epId, name: 'my eposide' };

      beforeEach(() => {
        mockFindById.mockResolvedValue(mockResult)
      })

      it('should call the service with correct parameters', async () => {
        await controller.findById(epId);
        expect(mockFindById).toHaveBeenCalledWith(epId);
      });

      it('should return correct response', async () => {
        const response = await controller.findById(epId);
        expect(response).toEqual(mockResult);
      });
    });

    describe('when eposide not found', () => {
      const epId = 'id2';
      beforeEach(() => {
        mockFindById.mockResolvedValue(null);
      });

      it('should throw an error', async () => {
        await expect(controller.findById(epId)).rejects.toThrow('Eposide not found!');
      })

    });

  });
});

