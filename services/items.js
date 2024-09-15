const itemsModel = require("../models/items.js");

class ItemsService {

    static async getAllItems(offset, limit, options = {}) {
        if (!isFinite(offset)) {
            throw new Error("invalid offset");
        };
        if (!isFinite(limit)) {
            throw new Error("invalid limit");
        };

        const result = await itemsModel.find({})
            .skip(offset)
            .limit(limit)
            .exec();
        return result; //return [] if not found item
    };

    static async getItemById(id) {
        if (!id || id.trim() === "") {
            const err = new Error("item's id is required");
            err.code = 400;
            throw err;
        };
        const result = await itemsModel.findById(id);
        return result; //return null if not found item
    };

    static async createItem(title) {
        if (typeof title !== "string" || title.trim() === "") {
            const err = new Error("item's title required and must be a string");
            err.code = 400;
            throw err;
        };

        const foundItem = await itemsModel.findOne({ title: title }); //return null if item not found
        if (foundItem) {
            const err = new Error("item already exists");
            err.code = 409;
            throw err;
        };
        const result = new itemsModel({
            title: title,
            createdAt: Date.now(),
        });
        await result.save();
        return result;
    };

    static async updateItemById(id, title) {
        if (!id || id.trim() === "") {
            const err = new Error("item's id is required");
            err.code = 400;
            throw err;
        };
        if (typeof title !== "string" || title.trim() === "") {
            const err = new Error("item's title required and must be a string");
            err.code = 400;
            throw err;
        };

        const foundTitle = await itemsModel.findOne({ title: title });
        if (foundTitle) {
            const err = new Error("this title is already in use. choose another one");
            err.code = 409;
            throw err;
        };
        const result = await itemsModel.findByIdAndUpdate(id, { title: title }, { new: true });
        return result; //return null if not found item
    };

    static async deleteItemById(id) {
        if (!id || id.trim() === "") {
            const err = new Error("item's id is required");
            err.code = 400;
            throw err;
        };

        const result = await itemsModel.findByIdAndDelete(id);
        return result; //return null if not found item
    };


    //classwork
    //function arguments categorization
    //1. required arguments (mandatory)
    //2. optional arguments (default values)

}

module.exports = ItemsService;