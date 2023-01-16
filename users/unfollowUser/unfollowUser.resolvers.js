import prisma from "../../prisma";
import { protectedResolver } from "../users.util";

export default {
    Mutation: {
        unfollowUser: protectedResolver(async (_, { username }, { thisUser }) => {

            const existUser = await prisma.user.findUnique({
                where: { username }
            });

            if (!existUser) {
                return {
                    ok: false,
                    error: "user does not exist."
                }
            }

            await prisma.user.update({
                where: {
                    id: thisUser.id
                },
                data: {
                    following: {
                        disconnect: {
                            username,
                        }
                    }
                }
            })

            return {
                ok: true,
                error: "user unfollow updated"
            }             
        })
    }
}


