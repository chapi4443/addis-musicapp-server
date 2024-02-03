const { SongModel, SongGeneres } = require("../model/music");

const createSong = async (req, res) => {
  try {
    const { title, album, artist, gener } = req.body;

    console.log(title, album, artist, gener);
    const newSong = new SongModel({
      title: title,
      album: album,
      artist: artist,
      gener: gener,
    });

    const savedSong = await newSong.save();

    res.status(201).json(savedSong);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getAllSongs = async (req, res) => {
  try {
    const songs = await SongModel.find();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSongById = async (req, res) => {
  try {
    const song = await SongModel.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSongById = async (req, res) => {
  try {
    const updatedSong = await SongModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSong) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSongById = async (req, res) => {
  try {
    const deletedSong = await SongModel.findByIdAndDelete(req.params.id);
    if (!deletedSong) {
      return res.status(404).json({ error: "Song not found" });
    }
    res.status(200).json({ message: "Song is successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOverallStatistics = async (req, res) => {
  try {
    const totalSongs = await SongModel.countDocuments();
    const allSongs = await SongModel.find();

    const uniqueArtists = new Set(allSongs.map((song) => song.artist));
    const uniqueAlbums = new Set(allSongs.map((song) => song.album));

    const totalArtists = uniqueArtists.size;
    const totalAlbums = uniqueAlbums.size;
    const totalGenres = SongGeneres.length;

    const genreStatistics = {};
    for (const genre of SongGeneres) {
      const genreCount = await SongModel.countDocuments({ gener: genre });
      genreStatistics[genre] = genreCount;
    }

    const artistStatistics = {};
    const albumStatistics = {};

    allSongs.forEach((song) => {
      if (!artistStatistics[song.artist]) {
        artistStatistics[song.artist] = { songs: 1 };
      } else {
        artistStatistics[song.artist].songs++;
      }

      if (!albumStatistics[song.album]) {
        albumStatistics[song.album] = {
          songs: 1,
          artists: [song.artist],
        };
      } else {
        albumStatistics[song.album].songs++;
        if (!albumStatistics[song.album].artists.includes(song.artist)) {
          albumStatistics[song.album].artists.push(song.artist);
        }
      }
    });

    const albumStatisticsArray = Object.entries(albumStatistics).map(
      ([album, stats]) => ({
        songs: stats.songs,
        album: album,
        artist: stats.artists.join(", "),
      })
    );

    res.status(200).json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      genreStatistics,
      artistStatistics,
      albumStatistics: albumStatisticsArray,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSong,
  getAllSongs,
  getSongById,
  updateSongById,
  deleteSongById,
  getOverallStatistics,
};
