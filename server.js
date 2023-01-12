import "dotenv/config";

import { ApolloServer } from "apollo-server";

import schema from "./schema";

const server = new ApolloServer({
    schema,
    context: {
        Auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjczNTA1Mjg0fQ.p0qdmqUcJfLJMpWttqQWlnEKB_qhftrPzZGtsDBUzGI"
    }
});

const PORT = process.env.APOLLO_PORT;

server.listen(PORT).then(() => console.log(`Apollo Server is runngin on http://localhost:${PORT}`));
