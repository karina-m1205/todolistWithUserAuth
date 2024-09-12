const express = require("express");
const ItemsService = require("../services/items.js");
const router = express.Router();

// 1 .shell version

router.get("/", async (req, res) => {
    try {
        const result = await ItemsService.getAllItems();
        if (result.length === 0) {
            return res.status(404).send("items not found");
        };
        return res.status(200).send(result);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || id.trim() === "") {
            return res.status(400).send("item's id is required");
        };

        const result = await ItemsService.getItemById(id);
        if (!result) {
            return res.status(404).send("item not found");
        };
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
            return res.status(400).send("item's title required and must be a string");
        };

        const result = await ItemsService.createItem(title);
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
            return res.status(400).send("item's id is required");
        };
        if (typeof title !== "string" || title.trim() === "") {
            return res.status(400).send("item's title required and must be a string");
        };

        const result = await ItemsService.updateItemById(id, title);
        if (!result) {
            return res.status(404).send("item not found");
        };
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
            return res.status(400).send("item's id is required");
        };
        const result = await ItemsService.deleteItemById(id);
        if (!result) {
            return res.status(404).send("item not found");
        };
        return res.status(200).send(result);
    } catch (err) {
        if (err.code === 400) {
            return res.status(err.code).send(err.message);
        };
        return res.status(500).send(err.message);
    }
});

module.exports = router;