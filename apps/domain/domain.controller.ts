import { RequestHandler, Response } from 'express';
import fs from 'fs';
import path from 'path';
import availableDomains from '../../data/domains.json';
import { RequestWithBodyParams } from '../../types/types';

const domains: string[] = availableDomains;

export const getDomains: RequestHandler = (_req, res) => res.send(domains);

export const patchDomains = async (
    req: RequestWithBodyParams,
    res: Response
) => {
    const { names } = req.body;
    if (!names?.length)
        return res.status(400).send({ message: 'Domain name is required' });

    names.forEach((name) => {
        if (!domains.includes(name)) {
            domains.push(name);
        }
    });
    try {
        await fs.promises.writeFile(
            path.join(__dirname, '../../data/domains.json'),
            JSON.stringify(domains)
        );
        return res.send({ message: "Domain's added" });
    } catch (error) {
        return res.status(500).send({ message: 'Server error' });
    }
};

export const deleteDomains = async (
    req: RequestWithBodyParams,
    res: Response
) => {
    const { names } = req.body;
    if (!names?.length)
        return res.status(400).send({ message: 'Domain name is required' });
    names.forEach((name) => {
        const index = domains.indexOf(name);
        if (index !== -1) {
            domains.splice(index, 1);
        } else {
            return res
                .status(400)
                .send({ message: `${name} is not in the list` });
        }
    });
    try {
        await fs.promises.writeFile(
            path.join(__dirname, '../../data/domains.json'),
            JSON.stringify(domains)
        );
        return res.send({ message: "Domain's removed" });
    } catch (error) {
        return res.status(500).send({ message: 'Server error' });
    }
};
