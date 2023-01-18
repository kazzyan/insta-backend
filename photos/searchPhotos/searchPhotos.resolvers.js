import prisma from "../../prisma";

export default {
    Query: {
        searchPhotos: (_, { keyword }) => prisma.photo.findMany({
            where: {
                caption: {
                    startsWith: keyword
                }
            }
        })
    }
}


