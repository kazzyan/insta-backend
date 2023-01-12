import jwt from "jsonwebtoken";

import prisma from "../prisma";

export const getThisUser = async (auth) => {
    try {

        if (!auth) {
            return null;
        }

        const { id } = jwt.verify(auth, process.env.PRIVATE_KEY);

        const thisUser = await prisma.user.findUnique({ where: { id } });

        if (thisUser) {
            return thisUser;
        } else {
            return null;
        }

    } catch {
        return null;
    }
}

export const protectedResolver = (ourResolver) => (root, args, context, info) => {   
    if (!context.thisUser) {        
        return {
            ok: false,
            error: "you need to login. please"
        }
    }

    return ourResolver(root, args, context, info);
}


