const express = require("express");
const router = express.Router();
const {
  createSong,
  getAllSongs,
  getSongById,
  updateSongById,
  deleteSongById,
  getOverallStatistics
} = require("../controller/songController");


router.post("/songs", createSong);


router.get("/songs", getAllSongs);


router.get("/songs/:id", getSongById);

router.put("/songs/:id", updateSongById);


router.delete("/songs/:id", deleteSongById);

router.get("/overall-statistics", getOverallStatistics);

module.exports = router;
