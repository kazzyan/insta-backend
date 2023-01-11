import bcrypt from "bcrypt"
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
    }
}


