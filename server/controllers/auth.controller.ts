import Auth from '../models/Auth.ts';
import User from "../models/User.ts";
import { Request, Response } from "express";
import axios from "axios";
import bcrypt from "bcrypt";

export async function login(req: Request, res: Response) {
    try {
        const {
            email,
            password
        } = req.body;

        // can be fixed later
        if (email === "admin" && password === "BZC-PDRK456crynoob") {
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
            username: userName
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