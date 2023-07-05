import 'server-only'
import { PrismaClient, Server } from '../prisma/client'

class Database extends PrismaClient {
  constructor() {
    super()
  }

  async getServers(): Promise<Server[]> {
    return this.server.findMany();
  }
  async getServer(id: number): Promise<Server|null> {
    return this.server.findUnique({ where: { id } });
  }

  async addServer(name: string, ip: string, sshPort: number, vncPort: number): Promise<number> {
    const server = await this.server.create({
      data: {
        name,
        ip,
        sshPort,
        vncPort,
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

  async deleteServer(id: number): Promise<Server> {
    return this.server.delete({ where: { id } });
  }
}
export const database = new Database();
