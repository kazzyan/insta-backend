import prisma from "../../prisma";

export default {
    Query: {
        seePhoto: (_, { id }) => prisma.photo.findUnique({
            where: {
                id
            }
        })
    }
}


