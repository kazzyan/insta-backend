import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../prisma";

export default {
    Mutation: {
        editProfile: async (_, { username, email, name, password: newPassword, token }) => {
            const { id } = jwt.verify(token, process.env.PRIVATE_KEY);
            
            let uglyPassword = null;

            if (newPassword) {
                uglyPassword = await bcrypt.hash(newPassword, 10);
            }

            const updateUser = await prisma.user.update({
                where: {
                    id
                },
                data: {
                    username,
                    email,
                    name,
                    ...(uglyPassword && { password: uglyPassword })
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
        }
    }
}


