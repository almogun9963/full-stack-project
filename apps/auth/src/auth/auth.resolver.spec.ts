import { Test, TestingModule } from "@nestjs/testing";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";

describe("AuthResolver", () => {
  let resolver: AuthResolver;
  let service: jest.Mocked<AuthService>;
  const mockUser = {
    id: "1",
    userName: "almog",
    password: "!Aa123456789",
    accessToken: "access-token",
    refreshToken: "refresh-token",
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
            refreshTokens: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    service = module.get(AuthService);
  });

  it("signUp: should return the created user", async () => {
    const input = { userName: mockUser.userName, password: mockUser.password };
    service.signUp.mockResolvedValue(mockUser);

    const result = await resolver.signUp({ req, res }, input);
    expect(result).toEqual(mockUser);
  });

  it("signUp: should return bad request for empty password", async () => {
    const input = { userName: mockUser.userName, password: "" };
    service.signUp.mockRejectedValue(
      new BadRequestException("Password cannot be empty"),
    );

    try {
      await resolver.signUp({ req, res }, input);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it("signUp: should return bad request for invalid password", async () => {
    const input = { userName: mockUser.userName, password: "aa" };
    service.signUp.mockRejectedValue(
      new BadRequestException("Invalid password"),
    );
    try {
      await resolver.signUp({ req, res }, input);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it("signIn: should return bad request for invalid credentials", async () => {
    const input = { id: mockUser.id, password: "aaa" };
    service.signIn.mockRejectedValue(
      new UnauthorizedException("Invalid credentials"),
    );

    try {
      await resolver.signIn({ res }, input);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });

  it("signIn: should return bad request for empty password", async () => {
    const input = { id: mockUser.id, password: "" };
    service.signIn.mockRejectedValue(new BadRequestException());

    try {
      await resolver.signIn({ res }, input);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
