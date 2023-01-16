import prisma from "../../prisma";

export default {
    Query: {
        seeProfile: (_, { username, page, row }) => prisma.user.findUnique({
            where: {
                username
            },
            include: {
                followers: {
                    take: row,
                    skip: (page - 1) * row
                },
                following: {
                    take: row,
                    skip: (page - 1) * row
                }
            }
        })
    }
}


