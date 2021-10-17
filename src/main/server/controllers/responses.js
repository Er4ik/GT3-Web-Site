import { valuesPages } from "../configs/var.js";
import { check } from "../validation/valid.js";
import { dataRx } from "../configs/var.js"

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
    const result = check(dataRx, req.body);

    if(result.result) res.status(201).json(req.body);
    else res.status(201).json({ response: "Incorrect values in input fields", "wrong-button": result.key});
}