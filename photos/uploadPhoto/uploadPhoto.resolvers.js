import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.util";
import { parsingHashtags } from "../photos.util";

export default {
    Mutation: {
        uploadPhoto: protectedResolver(async (_, { fileURL, caption }, { thisUser }) => {

            let hashtagsObj = [];

            if (caption) {
                hashtagsObj = parsingHashtags(caption);
            }

            return prisma.photo.create({
                data: {
                    fileURL,
                    caption,
                    user: {
                        connect: {
                            id: thisUser.id,
                        }
                    },
                    ...(hashtagsObj.length > 0 && {
                        hashtags: {
                            connectOrCreate: hashtagsObj
                        }
                    }),
                }
            });
        })
    }
}


