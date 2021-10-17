import { valuesPages } from "../configs/var.js";

export const respIndex = (req, res) => {
    res.status(200).render(valuesPages.index[0], {title: valuesPages.index[1]});
}

export const respSign = (req, res) => {
    res.status(200).render(valuesPages.sign, {title: valuesPages.sign});
}

export const respButTick = (req, res) => {
    res.status(200).render(valuesPages.butTick, {title: valuesPages.butTick});
}

export const authorize = (req, res) => {
    res.status(201).json(req.body);
}