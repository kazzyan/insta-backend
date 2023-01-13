import "dotenv/config";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import logger from "morgan";


import { typeDefs, resolvers } from "./schema";
import { getThisUser } from "./users/users.util";

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        return { 
            thisUser: await getThisUser(req.headers.auth)
        }
    }
});

const app = express();

app.use(logger("tiny"));

app.use("/img", express.static("uploads"));

apollo.applyMiddleware({ app });

const PORT = process.env.APOLLO_PORT;

app.listen({ port: PORT }, () => {
    console.log(`express & Apollo Server is runngin on http://localhost:${PORT}`)}
);
