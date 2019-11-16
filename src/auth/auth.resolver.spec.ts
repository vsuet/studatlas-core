import { Test, TestingModule } from '@nestjs/testing';
import { UserInfoResolver } from './user-info.resolver';

describe('AuthResolver', () => {
  let resolver: UserInfoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInfoResolver],
    }).compile();

    resolver = module.get<UserInfoResolver>(UserInfoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
