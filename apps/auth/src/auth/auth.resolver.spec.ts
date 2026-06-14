import { Test, TestingModule } from "@nestjs/testing";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";
import { RefreshTokenEntity } from "../user/entities/refresh.token.entity";

describe("AuthResolver", () => {
  let resolver: AuthResolver;
  let service: jest.Mocked<AuthService>;
  const mockUser = {
    id: "1",
    userName: "almog",
    password: "!Aa123456789",
    accessToken: "access-token",
    refreshTokens: [
      { refreshToken: "refresh-token", expireAt: new Date() },
    ] as RefreshTokenEntity[],
  };
  const req = {} as Request;
  const res = {
    cookie: jest.fn(),
  } as unknown as Response;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
            refreshTokenS: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    service = module.get(AuthService);
    (res.cookie as jest.Mock).mockClear();
  });

  it("signUp: should return the created user", async () => {
    const input = { userName: mockUser.userName, password: mockUser.password };
    service.signUp.mockResolvedValue(mockUser);

    const result = await resolver.signUp({ req, res }, input);

    expect(result).toEqual(mockUser);
    expect(res.cookie).toHaveBeenCalledWith(
      "accessToken",
      mockUser.accessToken,
      expect.objectContaining({ httpOnly: true }),
    );
  });

  it("signUp: should return bad request for empty password", async () => {
    const input = { userName: mockUser.userName, password: "" };
    service.signUp.mockRejectedValue(
      new BadRequestException("Password cannot be empty"),
    );

    await expect(resolver.signUp({ req, res }, input)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it("signUp: should return bad request for invalid password", async () => {
    const input = { userName: mockUser.userName, password: "aa" };
    service.signUp.mockRejectedValue(
      new BadRequestException("Invalid password"),
    );

    await expect(resolver.signUp({ req, res }, input)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it("signIn: should sign you in", async () => {
    const input = { username: mockUser.userName, password: "aaa" };

    service.signIn.mockResolvedValue(mockUser);

    const result = await resolver.signIn({ res }, input);

    expect(result).toEqual(mockUser);
    expect(res.cookie).toHaveBeenCalledWith(
      "accessToken",
      mockUser.accessToken,
      expect.objectContaining({ httpOnly: true }),
    );
  });

  it("signIn: should throw UnauthorizedException for invalid credentials", async () => {
    const input = { username: mockUser.userName, password: mockUser.password };
    service.signIn.mockRejectedValue(
      new UnauthorizedException("Invalid credentials"),
    );

    await expect(resolver.signIn({ res }, input)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it("signIn: should return bad request for empty password", async () => {
    const input = { username: mockUser.userName, password: "" };
    service.signIn.mockRejectedValue(new BadRequestException());

    await expect(resolver.signIn({ res }, input)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
