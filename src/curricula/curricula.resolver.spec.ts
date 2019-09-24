import { Test, TestingModule } from '@nestjs/testing';
import { CurriculaResolver } from './curricula.resolver';

describe('CurriculaResolver', () => {
  let resolver: CurriculaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurriculaResolver],
    }).compile();

    resolver = module.get<CurriculaResolver>(CurriculaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
