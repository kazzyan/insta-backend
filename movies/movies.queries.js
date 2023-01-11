import prisma from "../prisma";

export default {
    Query: {
        movies: () => prisma.movie.findMany(),
        movie: (_, { id }) => prisma.movie.findUnique({ where: { id } }),
    }
}
    
