import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../../prisma";

export default {
    Mutation: {
        login: async (_, { username, password }) => {
            const user = await prisma.user.findFirst({
                where: {
                    username
                }
            });

            if (!user) {
                return {
                    ok: false,
                    error: "user not found"
                }
            }

            const passwordOk = await bcrypt.compare(password, user.password);

            if (!passwordOk) {
                return {
                    ok: false,
                    error: "unvalid password"
                }
            }

            const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY);

            return {
                ok: true,
                token,
                error: "login success"
            }
        }
    }
}


