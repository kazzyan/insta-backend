import prisma from "../prisma";

export default {
    Mutation: {
        createMovie: (_, { title, year, genre }) => prisma.movie.create({
            data: {
                title,
                year,
                genre,
            },
        }),
        deleteMovie:  (_, { id }) => prisma.movie.delete({ where : { id } }),
        updateMovie:  (_, { id, year }) => prisma.movie.update({ where : { id }, data: { year } }),
    }
}
    