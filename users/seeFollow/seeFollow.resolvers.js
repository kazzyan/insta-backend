import prisma from "../../prisma";

export default {
    Query: {
        seeFollowers: async (_, { username, page }) => {
            const aFollowers = await prisma.user.findUnique({
                where: {
                    username
                }
            }).followers();
            console.log(aFollowers);
        }
    }
}


