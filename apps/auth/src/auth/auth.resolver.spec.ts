import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let service: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
            refreshTokens: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    service = module.get(AuthService);
  });

  it('signUp service method', async () => {
    const input = { userName: 'almog', password: 'amiga' };
    service.signUp.mockResolvedValue({ userName: 'almog', password: 'amiga' });

    const result = await resolver.signUp(input);
    expect(service.signUp).toHaveBeenCalledWith(input);
    expect(result).toEqual({ userName: 'almog', password: 'amiga' });
  });

  it('signIn service method', async () => {
    const input = { id: '6a1e9aa5c32b593a58cc374c', password: 'amiga' };
    service.signIn.mockResolvedValue({
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMWU5YWE1YzMyYjU5M2E1OGNjMzc0YyIsInVzZXJuYW1lIjoiYWxtb2ciLCJpYXQiOjE3ODAzOTc4NjgsImV4cCI6MTc4MDM5ODQ2OH0.L8xztrtr_D9FFg9bOoenMT6WXhQ-g_SrLLovtUgVlfA',
      refresh_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMWU5YWE1YzMyYjU5M2E1OGNjMzc0YyIsInVzZXJuYW1lIjoiYWxtb2ciLCJpYXQiOjE3ODAzOTA1NjUsImV4cCI6MTc4MDk5NTM2NX0.VHg2VOEk6c9F_s2LwBHnsNQq7yzMsxyu43mKnBH8A8o',
    });

    const result = await resolver.signIn(input);
    expect(service.signIn).toHaveBeenCalledWith(input);
    expect(result).toEqual({
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMWU5YWE1YzMyYjU5M2E1OGNjMzc0YyIsInVzZXJuYW1lIjoiYWxtb2ciLCJpYXQiOjE3ODAzOTc4NjgsImV4cCI6MTc4MDM5ODQ2OH0.L8xztrtr_D9FFg9bOoenMT6WXhQ-g_SrLLovtUgVlfA',
      refresh_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMWU5YWE1YzMyYjU5M2E1OGNjMzc0YyIsInVzZXJuYW1lIjoiYWxtb2ciLCJpYXQiOjE3ODAzOTA1NjUsImV4cCI6MTc4MDk5NTM2NX0.VHg2VOEk6c9F_s2LwBHnsNQq7yzMsxyu43mKnBH8A8o',
    });
  });

  it('refresh service method', async () => {
    const input = {
      id: '6a1e9aa5c32b593a58cc374c',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMWU5YWE1YzMyYjU5M2E1OGNjMzc0YyIsInVzZXJuYW1lIjoiYWxtb2ciLCJpYXQiOjE3ODAzOTA1NjUsImV4cCI6MTc4MDk5NTM2NX0.VHg2VOEk6c9F_s2LwBHnsNQq7yzMsxyu43mKnBH8A8o',
    };
    service.refreshTokens.mockResolvedValue({
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMWU5YWE1YzMyYjU5M2E1OGNjMzc0YyIsInVzZXJuYW1lIjoiYWxtb2ciLCJpYXQiOjE3ODAzOTc4NjgsImV4cCI6MTc4MDM5ODQ2OH0.L8xztrtr_D9FFg9bOoenMT6WXhQ-g_SrLLovtUgVlfA',
    });

    const result = await resolver.refresh(input);
    expect(service.refreshTokens).toHaveBeenCalledWith(input);
    expect(result).toEqual({
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMWU5YWE1YzMyYjU5M2E1OGNjMzc0YyIsInVzZXJuYW1lIjoiYWxtb2ciLCJpYXQiOjE3ODAzOTc4NjgsImV4cCI6MTc4MDM5ODQ2OH0.L8xztrtr_D9FFg9bOoenMT6WXhQ-g_SrLLovtUgVlfA',
    });
  });
});
