import prisma from "../../prisma";

export default {
    Query: {
        seeFollowing: async (_, { username, lastId }) => {

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

            const following = await prisma.user.findUnique({
                where: {
                    username
                }
            }).following({
                take: 5,
                skip: 1,
                ..._(lastId && { cursor: { id: lastId }})
            });

            return {
                ok: true,
                following
            }
        }
    }
}


