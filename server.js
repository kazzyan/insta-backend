import "dotenv/config";

import { ApolloServer } from "apollo-server";

import schema from "./schema";

const server = new ApolloServer({
    schema,
});

const PORT = process.env.APOLLO_PORT;

server.listen(PORT).then(() => console.log(`Apollo Server is runngin on http://localhost:${PORT}`));
