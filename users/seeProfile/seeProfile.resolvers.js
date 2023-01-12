import prisma from "../../prisma";

export default {
    Query: {
        seeProfile: (_, { username }) => prisma.user.findUnique({
            where: {
                username
            }
        })
    }
}


