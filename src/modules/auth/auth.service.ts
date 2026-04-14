import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt";

type userRequest = {
    name: string;
    email : string;
    password : string;
}

export const findUser = async (email : string) => {
    const findingResult = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });
    return findingResult;
}

export const isValidPassword = async (userPassword: string, passwordHash: string) => {
    return await bcrypt.compare(userPassword, passwordHash);
}

export const createUser = async (user : userRequest) => {
    const hash = Number(process.env.HASH) || 10;

    const passwordHash = await bcrypt.hash(user.password, hash);
    const newUser = await prisma.user.create({
    data: {
        email : user.email,
        name : user.name,
        password : passwordHash
    }});

    return newUser;
}





















