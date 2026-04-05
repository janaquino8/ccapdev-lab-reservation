import Auth from '../models/Auth.js';
import User from "../models/User.js";
import { Request, Response } from "express";
import axios from "axios";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { AuthRequest } from "./auth.middleware.js";

export async function checkAuth(req: AuthRequest, res: Response) {
    try {
        const userId = req.user.id;

        if (userId === "admin") {
            return res.status(200).send({ givenName: "admin", lastName: "admin", username: "admin" });
        }

        const userProfile = await User.findById(userId);

        if (!userProfile) {
            return res.status(404).json({ error: "User not found." });
        }
        res.status(200).send(userProfile);
    } catch (err: any) {
        console.error(err);
        res.status(500).send({ error: "Error verifying session." });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const {
            email,
            password,
            rememberMe
        } = req.body;

        const secretKey = process.env.JWT_SECRET || "super_secret_key";
        const tokenExpiration = rememberMe ? '21d' : '1d'; 
        const cookieMaxAge = rememberMe ? 21 * 24 * 60 * 60 * 1000 : undefined;

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict' as const,
            maxAge: cookieMaxAge 
        };

        if (email === "admin" && password === "admin1234") {
            const token = jwt.sign({ id: "admin", rememberMe: rememberMe }, secretKey, { 
                expiresIn: tokenExpiration 
            });
            res.cookie('jwt', token, cookieOptions);

            return res.status(200).send({ givenName: "admin", lastName: "admin", username: "admin" });
        }

        if (!email.includes("@dlsu.edu.ph")) {
            return res.status(400).send({ error: "Email must be a DLSU Email." });
        }
        
        const userName = email.replace("@dlsu.edu.ph", "");
        
        const authRecord = await Auth.findOne({ username: userName });

        if (!authRecord) {
            return res.status(404).send({ error: "User not found." });
        }

        if (!(await bcrypt.compare(password, authRecord.password))) {
            return res.status(401).send({ error: "Invalid login." });
        }

        const userProfile = await User.findOne({ username: userName });

        if (!userProfile) {
            return res.status(404).send({ error: "User profile missing from database." });
        }
        
        const token = jwt.sign({ id: userProfile._id, rememberMe: rememberMe }, secretKey, { 
            expiresIn: tokenExpiration 
        });

        res.cookie('jwt', token, cookieOptions);
        res.status(200).send(userProfile);

    } catch (err: any) {
        console.error(err);
        res.status(500).send({ error: "Error on authentication: " + err.message });
    }
}

export async function register(req: Request, res: Response) {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email.includes("@dlsu.edu.ph")) {
            return res.status(400).send({ error: "Email must be a DLSU Email." });
        }

        const userName = email.replace("@dlsu.edu.ph", "")

        let temp = userName.split(/[._]/);
        
        if (temp.length <= 1 || temp.includes("")) {
            return res.status(400).send({ error: "Invalid DLSU Email." });
        }

        temp = temp.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        
        const len = temp.length;
        const given = temp.slice(0, len - 1).join(" ");
        const last = temp[len - 1];

        const passwordHash = await bcrypt.hash(password, 10);

        await User.create({
            givenName: given,
            lastName: last,
            username: userName,
            email: email
        });

        await Auth.create({
            username: userName,
            password: passwordHash
        });

        res.status(201).send({ message: "User successfully created." })
    } catch (err: any) {
        console.error(err);

        if (err.message.includes("E11000 duplicate key error collection: labDB.users index: username_1 dup key")) {
            return res.status(400).send({ error: "User already exists." });
        }

        res.status(500).send({error: "Error on authentication: " + err.message});
    }
}

export async function logout(req: Request, res: Response) {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0) 
    });
    res.status(200).json({ message: "Successfully logged out." });
}

// for creating admin account in db
export async function setupAdmin(req: Request, res: Response) {
    try {
        const existingAdmin = await Auth.findOne({ username: "admin" });
        if (existingAdmin) {
            return res.status(400).send({ message: "Admin account already exists!" });
        }

        const passwordHash = await bcrypt.hash("admin1234", 10);

        await User.create({
            givenName: "System",
            lastName: "Admin",
            username: "admin",
            email: "admin@dlsu.edu.ph"
        });
        await Auth.create({
            username: "admin",
            password: passwordHash
        });

        res.status(201).send({ message: "Admin account successfully generated!" });
    } catch (err: any) {
        console.error(err);
        res.status(500).send({ error: "Failed to create admin: " + err.message });
    }
}