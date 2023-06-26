import 'server-only'
import { PrismaClient, Server } from '../prisma/client'

class Database extends PrismaClient {
  constructor() {
    super()
  }

  async getServers(): Promise<Server[]> {
    let servers = await this.server.findMany();

    return servers;
  }
  async getServer(id: number): Promise<Server|null> {
    return this.server.findUnique({ where: { id } });
  }

  async addServer(name: string, ip: string, port: number): Promise<number> {
    const server = await this.server.create({
      data: {
        name,
        ip,
        port,
        status: 'offline',
      }
    });

    return server.id;
  }

  async updateServer(id: number, params: Partial<Omit<Server, "id">>): Promise<Server> {
    return this.server.update({
      where: { id },
      data: params,
    });
  }
}
export const database = new Database();
