import prisma from "../../prisma";
import { protectedResolver } from "../../users/users.util";
import { parsingHashtags } from "../photos.util";

export default {
    Mutation: {
        toggleLike: protectedResolver(async (_, { id }, { thisUser }) => {

            const existPhoto = await prisma.photo.findUnique({
                where: {
                    id
                }
            });

            if (!existPhoto) {
                return {
                    ok: false,
                    error: "photo not found"
                }
            }

            const likedWhere = {
                photoId_userId: {
                    photoId: id,
                    userId: thisUser.id
                }
            }

            const liked = await prisma.like.findUnique({
                where: likedWhere
            });

            if (liked) {
                await prisma.like.delete({
                    where: likedWhere
                });

                return {
                    ok: true,
                    error: "this photo unliked"
                }
            } else {
                await prisma.like.create({
                    data: {
                        user: {
                            connect: {
                                id: thisUser.id
                            }
                        },
                        photo: {
                            connect: {
                                id: existPhoto.id
                            }
                        }
                    }
                });

                return {
                    ok: true,
                    error: "this photo liked"
                }
            }

        })
    }
}


