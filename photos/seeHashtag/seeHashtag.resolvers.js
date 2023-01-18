import prisma from "../../prisma";

export default {
    Query: {
        seeHashtag: (_, { hashtag }) => prisma.hashtag.findUnique({
            where: {
                hashtag
            }
        })
    }
}


