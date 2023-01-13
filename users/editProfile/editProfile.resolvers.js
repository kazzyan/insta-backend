import bcrypt from "bcrypt";
import { createWriteStream } from "fs";

import prisma from "../../prisma";
import { protectedResolver } from "../users.util";

export default {
    Mutation: {
        editProfile: protectedResolver(async (_, { username, email, name, password: newPassword, bio, avatarURL }, { thisUser }) => {

            let uglyPassword = null;

            if (newPassword) {
                uglyPassword = await bcrypt.hash(newPassword, 10);
            }

            let newAvatarUrl = null;

            if (avatarURL) {
                const { filename, createReadStream } = await avatarURL;
                const uploadFilename = `${thisUser.id}_${Date.now()}_${filename}`;

                const readStream = createReadStream();
                const writeStream = createWriteStream(process.cwd() + "/uploads/" + uploadFilename); 
                readStream.pipe(writeStream);
                
                newAvatarUrl = `http://localhost:4000/img/${uploadFilename}`;
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
                    ...(newAvatarUrl && { avatarURL: newAvatarUrl })
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


