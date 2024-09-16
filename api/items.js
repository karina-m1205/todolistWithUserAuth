const express = require("express");
const ItemsService = require("../services/items.js");
const { ItemNotFound, ItemsNotFound, IdIsRequired, TitleRequired } = require("../core/customError.js");
const responseBuilder = require("../core/responseBuilder.js");

const router = express.Router();

// 1 .shell version

router.get("/", async (req, res) => {
    try {
        const { offset, limit, ...options } = req.query;
        let result = await ItemsService.getAllItems(parseInt(offset), parseInt(limit), options);
        if (result.length === 0) {
            const err = new ItemsNotFound();
            return res.status(err.code).send(err.message);
        };

        result = responseBuilder(req, result);
        return res.status(200).send(result);
    } catch (err) {
        if (err.code = 400) {
            return res.status(err.code).send(err.message);
        };
        return res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || id.trim() === "") {
            const err = new IdIsRequired();
            return res.status(err.code).send(err.message);
        };

        let result = await ItemsService.getItemById(id);
        if (!result) {
            const err = new ItemNotFound();
            return res.status(err.code).send(err.message);
        };

        result = responseBuilder(req, result);
        return res.status(200).send(result);
    } catch (err) {
        if (err.code = 400) {
            return res.status(err.code).send(err.message);
        };
        return res.status(500).send(err.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const { title } = req.body;
        if (typeof title !== "string" || title.trim() === "") {
            const err = new TitleRequired();
            return res.status(err.code).send(err.message);
        };

        let result = await ItemsService.createItem(title);
        result = responseBuilder(req, result);
        return res.status(200).send(result);
    } catch (err) {
        if (err.code === 400) {
            return res.status(err.code).send(err.message);
        };
        if (err.code === 409) {
            return res.status(409).send(err.message);
        };
        return res.status(500).send(err.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { title } = req.body;
        if (!id || id.trim() === "") {
            const err = new IdIsRequired();
            return res.status(err.code).send(err.message);
        };
        if (typeof title !== "string" || title.trim() === "") {
            const err = new TitleRequired();
            return res.status(err.code).send(err.message);
        };

        let result = await ItemsService.updateItemById(id, title);
        if (!result) {
            const err = new ItemNotFound();
            return res.status(err.code).send(err.message);
        };

        result = responseBuilder(req, result);
        return res.status(200).send(result);
    } catch (err) {
        if (err.code === 400) {
            return res.status(err.code).send(err.message);
        };
        if (err.code === 409) {
            return res.status(err.code).send(err.message);
        };
        return res.status(500).send(err.message);
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || id.trim() === "") {
            const err = new IdIsRequired();
            return res.status(err.code).send(err.message);
        };
        let result = await ItemsService.deleteItemById(id);
        if (!result) {
            const err = new ItemNotFound();
            return res.status(err.code).send(err.message);
        };

        result = responseBuilder(req, result);
        return res.status(200).send(result);
    } catch (err) {
        if (err.code === 400) {
            return res.status(err.code).send(err.message);
        };
        return res.status(500).send(err.message);
    }
});

module.exports = router;