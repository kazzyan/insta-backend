import prisma from "../../prisma";

export default {
    Query: {
        searchUsers: async (_, { keyword, page }) => {
            const users = await prisma.user.findMany({
                where: {
                    username: {
                        startsWith: keyword.toLowerCase()
                    }
                },
                skip: (page - 1) * 3,
                take: 3
            });

            return users;
        }
    }
}


