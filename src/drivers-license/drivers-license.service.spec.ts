import { Test, TestingModule } from '@nestjs/testing';
import { DriversLicenseService } from './drivers-license.service';

describe('DriversLicenseService', () => {
  let service: DriversLicenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriversLicenseService],
    }).compile();

    service = module.get<DriversLicenseService>(DriversLicenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
