import prisma from "../prisma";

export default {
    User: {
        totalFollowers: ({ id }) => prisma.user.count({
            where: {
                following: {
                    some: {
                        id
                    }
                }
            }
        }),
        totalFollowing: ({ id }) => {
            return prisma.user.count({
                where: {
                    followers: {
                        some: {
                            id
                        }
                    }
                }
            });
        },
        isFollowing: async ({ id }, _, { thisUser }) => {
            if (!thisUser) {
                return false;
            }

            const exists = await prisma.user.findUnique({
                where: {
                    username: thisUser.username
                }
            }).following({
                where: {
                    id
                }
            })

            return exists.length !== 0;
        },
        isMe: ({ id }, _, { thisUser }) => {
            if (!thisUser) {
                return false;
            }

            return id === thisUser.id;
        },
    }
}


