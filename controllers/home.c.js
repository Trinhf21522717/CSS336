const Music = require("../module/music.m")
module.exports = {
    getHome: async function (req, res) {
        const songs = await Music.getMusic()
        res.render('home', {
            layout: "main",
            title: "My MP3",
            style: ["home.css"],
            script: "home.js",
            songs: songs
        })
    },
    portMusic: async function (req, res) {
        const path = await Music.getPathbyID(req.body.id)
        // console.log(path);
        res.json({ path: path[0].path })
    },
    deleteMusic: async function (req, res) {

        const path = await Music.deleteSongbyID(req.body.id)
        res.json({ mss: 'ok' })
    }
}