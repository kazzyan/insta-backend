import prisma from "../../prisma";

export default {
    Query: {
        seeFollowers: async (_, { username, page }) => {

            const existUser = await prisma.user.findUnique({
                where: { username },
                select: { id: true }
            });

            if (!existUser) {
                return {
                    ok: false,
                    error: "user does not exist."
                }
            }

            const followers = await prisma.user.findUnique({
                where: {
                    username
                }
            }).followers({
                take: 5,
                skip: (page - 1) * 5
            });

            const totalFollowers = await prisma.user.count({
                where: {
                    following: {
                        some : {
                            username
                        }
                    }
                }
            });

            return {
                ok: true,
                followers,
                totalPages: Math.ceil(totalFollowers / 5)
            }
        }
    }
}


