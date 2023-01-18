import prisma from "../../prisma";

export default {
    Query: {
        seePhotoLikes: async (_, { id }) => {
            const likes = prisma.photo.findMany({
                where: {
                    photoId: id
                },
                select: {
                    user: true
                }
            })
            return (await likes).map((like) => like.user);
        }
    }
}


