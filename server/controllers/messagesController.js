import messageModel from "../model/messageModel.js";

export const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });
        if (data) return res.json({ msg: "Message added successfully." });
        return res.json({ msg: "Failed to add message to the database." });
    } catch (error) {
        next(error);
    }
};

export const getAllMessage = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
};