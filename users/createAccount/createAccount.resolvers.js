import bcrypt from "bcrypt";

import prisma from "../../prisma";

export default {
    Mutation: {
        createAccount: async (_, { username, email, name, password }) => {
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { username },
                        { email }                        
                    ]
                }
            });

            if (existingUser) {
                return {
                    ok: false,
                    error: "username/email exists already"
                }
            }
            
            const uglyPassword = await bcrypt.hash(password, 10);

            const createUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    name,
                    password: uglyPassword
                }
            })
            
            if (createUser) {
                return {
                    ok: true,
                    error: "user created"
                }
            } else {
                return {
                    ok: false,
                    error: "could not user create"
                }
            }
        }
    }
}


