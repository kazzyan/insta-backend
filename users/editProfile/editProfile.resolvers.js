import bcrypt from "bcrypt";

import prisma from "../../prisma";
import { protectedResolver } from "../users.util";

export default {
    Mutation: {
        editProfile: protectedResolver(async (_, { username, email, name, password: newPassword, bio }, { thisUser }) => {
            
            let uglyPassword = null;

            if (newPassword) {
                uglyPassword = await bcrypt.hash(newPassword, 10);
            }

            const updateUser = await prisma.user.update({
                where: {
                    id: thisUser.id
                },
                data: {
                    username,
                    email,
                    name,
                    ...(uglyPassword && { password: uglyPassword }),
                    bio,
                }
            })

            if (updateUser) {
                return {
                    ok: true,
                    error: "profile updated"
                }
            } else {
                return {
                    ok: false,
                    error: "could not profile update"
                }
            }              
        })
    }
}


