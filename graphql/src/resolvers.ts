import { Resolvers } from './__generated__/resolvers'

export const resolvers: Resolvers = {
    Query: {
        books: (_, __, context) => {
            return [
                {
                    title: 'Harry Potter and the Chamber of Secrets',
                    author: 'J.K. Rowling',
                },
            ];
        }
    },
}
