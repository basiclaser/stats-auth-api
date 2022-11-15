const mongoose = require("mongoose");

const UserStatSchema = new mongoose.Schema(
    {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    averageMovesPerGame: Number,
    averageTimePerGame: Number,
    totalGamesPlayed: Number,
    bestScore: Number,
    },
    { timestamps: true }
);

const UserStat = mongoose.model("UserStat", UserStatSchema);
module.exports = UserStat;