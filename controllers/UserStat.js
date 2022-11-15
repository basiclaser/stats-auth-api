
const { UserStat } = require("../models");

exports.getAllUserStats = async function (req, res) {
    const all = await UserStat.find().limit(10);
    res.json(all);
};

exports.getUserStatById = async function (req, res) {
    const { id } = req.params;
    const single = await UserStat.findOne({ id: Number(id) });
    if (!single) {
        return res.status(404).send("UserStat with this ID does not exist");
    }
    res.json(single);
};

const avg = (a, b) => Math.round((a + b) / 2);

exports.updateUserStat = async (req, res) => {
    // context: this is called when the user completes a game
    // req.body should contain the following:

    const { moves, time } = req.body;
    
    // step 1: get the userstat for the user
    const statsDocument = await UserStat.findOne({ userId: req.session.userId });

    const newAvg = avg(statsDocument.averageMovesPerGame, moves);
    const newAvgTime = avg(statsDocument.averageTimePerGame, time);
    const newTotalGamesPlayed = statsDocument.totalGamesPlayed + 1;
    const highestScore = Math.min(statsDocument.bestScore, moves);

    const updatedStats = await UserStat.findOneAndUpdate(
        { userId: req.session.userId },
        {
            averageMovesPerGame: newAvg,
            averageTimePerGame: newAvgTime,
            totalGamesPlayed: newTotalGamesPlayed,
            bestScore: highestScore,
        },
        { new: true }
    );

    res.json(updatedStats);
}