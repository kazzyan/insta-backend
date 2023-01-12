import "dotenv/config";

import { ApolloServer } from "apollo-server";

import { typeDefs, resolvers } from "./schema";
import { getThisUser } from "./users/users.util";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        return { 
            thisUser: await getThisUser(req.headers.auth)
        }
    }
});

const PORT = process.env.APOLLO_PORT;

server.listen(PORT).then(() => console.log(`Apollo Server is runngin on http://localhost:${PORT}`));
