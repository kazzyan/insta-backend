import jwt from "jsonwebtoken";

import prisma from "../prisma";

export const parsingHashtags = (caption) => {

    const hashtags = caption.match(/#[\w]+/g) || [];

    const hashtagsObj = hashtags.map((hashtag) => ({
        where: { hashtag },
        create: { hashtag }
    }));

    return hashtagsObj;
}


