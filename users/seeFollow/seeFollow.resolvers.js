import prisma from "../../prisma";

export default {
    Query: {
        seeFollowers: async (_, { username, page }) => {
            const bFollowers = await prisma.user.findMany({
                where: {
                    following: {
                        some : {
                            username
                        }
                    }
                }
            });
            console.log(bFollowers);
        }
    }
}


