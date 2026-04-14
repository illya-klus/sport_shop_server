import { Request, Response } from "express";
import { createUser, verifyRefreshJWT, findUserByEmail, generateAccessToken, generateRefreshToken, isValidPassword, findUserById } from "./auth.service.js";
import type { RefreshTokenPayload, TokenPayload } from "./auth.service.js";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);

        if (!user || !(await isValidPassword(password, user.password))) {
          return res.status(401).send("Invalid credentials.");
        }

        const payload: TokenPayload = {
          id: user.id,
          email: user.email,
          role: user.role,
        };

        const token = generateAccessToken(payload);
        const refreshToken = generateRefreshToken({
            id: user.id,
            email: user.email,
        });

        res
          .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          })
          .status(200)
          .json({
            accessToken: token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              image: user.image,
            },
          });
    } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).send("Internal server error");
  }
}

export const register = async (req: Request, res: Response) => {
    const user = req.body;
    
    const isUserExists = await findUserByEmail(user.email);
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

export const refresh = async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).send("No refresh token");

    const secret = process.env.REFRESH_TOKEN_SECRET;
    if (!secret) return res.status(500).send("Server error");

    const decoded = verifyRefreshJWT(token, secret);
    if(!decoded) return res.status(401).send("Invalid refresh token");

    const user = await findUserById((decoded as RefreshTokenPayload).id);
    if(!user) return res.status(401).send("User not found");

    const payload: TokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };

    const newAccessToken = generateAccessToken(payload);

    return res.status(200).json({
        accessToken: newAccessToken,
    });
}