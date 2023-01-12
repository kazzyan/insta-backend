import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

export default {
    Query: {
        seeProfile: (_, { username }) => prisma.user.findUnique({
            where: {
                username
            }
        })
    },
    Mutation: {
        createAccount: async (_, { username, email, name, password }) => {
            try {
                const existingUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { username },
                            { email }                        
                        ]
                    }
                });

                if (existingUser) {
                    throw new Error("username/email exists already");
                }
                
                const uglyPassword = await bcrypt.hash(password, 10);

                return prisma.user.create({
                    data: {
                        username,
                        email,
                        name,
                        password: uglyPassword
                    }
                })
            } catch(error) {
                return error;
            }            
        },
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


