// userService.test.ts
import { getOneUser } from "../src/services/userService";
import { AppDataSource } from "../src/database/data-source";
import { User } from "../src/entities/User";

// Mock do repositório
const mockUserRepository = {
  findOneBy: jest.fn(),
};

// Mock do DataSource para retornar o repositório
jest.mock("../src/database/data-source", () => ({
  AppDataSource: {
    getRepository: jest.fn(() => mockUserRepository),
  },
}));

describe("UserService - getOneUser", () => {
  it("deve retornar usuário quando encontrar por id", async () => {
    mockUserRepository.findOneBy.mockResolvedValue({
      id: "123",
      email: "test@test.com",
    });

    const user = await getOneUser("123");
    expect(user).toHaveProperty("email", "test@test.com");
  });

  it("deve lançar erro se não encontrar usuário", async () => {
    mockUserRepository.findOneBy.mockResolvedValue(null);

    await expect(getOneUser("not exist"))
      .rejects
      .toThrow("Usuário não encontrado");
  });
});
