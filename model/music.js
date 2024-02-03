const mongoose = require("mongoose");
const SongGeneres = [
  "Blues",
  "Classical music",
  "Country",
  "Disco",
  "Electronic music",
  "Hip hop music",
  "Jazz",
  "Middle Eastern music",
  "Pop music",
  "Reggae",
  "Rock music",
  "Rhythm and blues",
  "Vocal music",
];

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Song title is required"],
    },
    album: {
      type: String,
      required: [true, "Song album is required"],
      default: "single",
    },
    artist: {
      type: String,
      required: [true, "Song artist is required"],
    },
    gener: {
      type: String,
      required: [true, "Song gener is required"],
    },
  },
  { timestamps: true }
);
const SongModel = mongoose.model("song", SongSchema);
module.exports = { SongModel, SongGeneres };
