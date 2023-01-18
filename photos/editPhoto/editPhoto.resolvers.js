import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.util";
import { parsingHashtags } from "../photos.util";

export default {
    Mutation: {
        editPhoto: protectedResolver(async (_, { id, caption }, { thisUser }) => {

            const existPhoto = await prisma.photo.findFirst({
                where: {
                    id,
                    userId: thisUser.id
                },
                include: {
                    hashtags: {
                        select: {
                            hashtag: true
                        }
                    }
                }
            });

            if (!existPhoto) {
                return {
                    ok: false,
                    error: "photo not found"
                }
            }

            const updatePhoto = await prisma.photo.update({
                where: { id },
                data: {
                    caption,
                    hashtags: {
                        disconnect: existPhoto.hashtags,
                        connectOrCreate: parsingHashtags(caption)
                    }
                }
            });

            if (updatePhoto) {
                return {
                    ok: true,
                    error: "photo's caption and hashtags updated"
                }
            }
        })
    }
}


