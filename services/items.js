const itemsModel = require("../models/items.js");
const { TitleInUse, ItemExists, } = require("../core/customError.js");
const { isFiniteOffset, isFiniteLimit, isIdValid, isTitleValid } = require("../core/validators.js");

class ItemsService {

    static async getAllItems(offset, limit, options = {}) {
        isFiniteOffset(offset);
        isFiniteLimit(limit);

        const result = await itemsModel.find({})
            .skip(offset)
            .limit(limit)
            .exec();
        return result; //return [] if not found item
    };

    static async getItemById(id) {
        isIdValid(id);

        const result = await itemsModel.findById(id);
        return result; //return null if not found item
    };

    static async createItem(title) {
        isTitleValid(title);

        const foundItem = await itemsModel.findOne({ title: title }); //return null if item not found
        if (foundItem) {
            throw new ItemExists();
        };
        const result = new itemsModel({
            title: title,
            createdAt: Date.now(),
        });
        await result.save();
        return result;
    };

    static async updateItemById(id, title) {
        isIdValid(id);
        isTitleValid(title);

        const foundTitle = await itemsModel.findOne({ title: title });
        if (foundTitle) {
            throw new TitleInUse();
        };
        const result = await itemsModel.findByIdAndUpdate(id, { title: title }, { new: true });
        return result; //return null if not found item
    };

    static async deleteItemById(id) {
        isIdValid(id);

        const result = await itemsModel.findByIdAndDelete(id);
        return result; //return null if not found item
    };


    //classwork
    //function arguments categorization
    //1. required arguments (mandatory)
    //2. optional arguments (default values)

}

module.exports = ItemsService;