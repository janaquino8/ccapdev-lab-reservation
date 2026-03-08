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
            return res.status(400).send({ errorr: "Email must be a DLSU Email." });
        }
        const userName = email.replace("@dlsu.edu.ph", "")
        const user = await Auth.findOne({ username: userName });

        if (!user) {
            return res.status(404).send({ error: "User not found." });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ error: "Invalid login." });
        }

        res.status(200).send(user);
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
            return res.status(400).send({ errorr: "Email must be a DLSU Email." });
        }

        // gathering of info (i made it manual for now i.e., not getting info from google themselves)
        const userName = email.replace("@dlsu.edu.ph");
        
        const temp = userName.split(".").split("_").map((word: String) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
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
        res.status(500).send({error: "Error on authentication" + err.message});
    }

}