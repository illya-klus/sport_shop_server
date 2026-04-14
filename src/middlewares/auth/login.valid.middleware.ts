import { NextFunction, Request, Response } from "express";


export const loginMiddleware = (req:Request, res:Response, next:NextFunction) => {
    if(!req.body) return res.status(400).send("No user info sended.");
    if(!req.body.password || !req.body.email) return res.status(400).send("Sended user object has invalid data.");
    next();    
}