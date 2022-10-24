import { User } from '@prisma/client-api';
export declare function authenticate(_username: string, _password: string): Promise<Omit<User, 'password'> | undefined>;
export declare function hashPassword(input: string): string;
