import prisma from "../prisma";

export default {
    Photo: {
        user: ({ userId }) => prisma.user.findUnique({
            where: {
                id: userId
            }
        }),
        hashtags: ({ id }) => prisma.hashtag.findMany({
            where: {
                photos: {
                    some: {
                        id
                    }
                }
            }
        }),
        totalLikes: ({ id }) => prisma.like.count({
            where: {
                photoId: id
            }
        })
    },
    Hashtag: {
        photos: ({ id }, { page }, { thisUser }) => prisma.hashtag.findFirst({
            where: { id }
        }).photos({
            take: 2,
            skip: (page - 1) * 2
        }),
        totalPhotos: ({ id }) => prisma.photo.count({
            where: {
                hashtags: {
                    some: {
                        id
                    }
                }
            }
        })
    }
}


