import { Request, Response } from "express";
import { createUser, findUser, isValidPassword } from "./auth.service.js";

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await findUser(email);

    if(!user) return res.status(404).send("Not found this user.");
    if(!(await isValidPassword(password, user.password))) return res.status(401).send("Wrong password.");

    return res.status(200).json({
        id: user.id,
        email: user.email,
        role: user.role
    });
}

export const register = async (req: Request, res: Response) => {
    const user = req.body;
    
    const isUserExists = await findUser(user.email);
    if(isUserExists) return res.status(409).send("User already exists.");

    const newUser = await createUser(user);

    if(!newUser) return res.status(500).send("Server error. Cannot create user.");

    return res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email : newUser.email,
        role : newUser.role,
        image : newUser.image
    });
}