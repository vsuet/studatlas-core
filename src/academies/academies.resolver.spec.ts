import { Test, TestingModule } from '@nestjs/testing';
import { AcademiesResolver } from './academies.resolver';

describe('AcademiesResolver', () => {
  let resolver: AcademiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademiesResolver],
    }).compile();

    resolver = module.get<AcademiesResolver>(AcademiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
