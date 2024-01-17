const Music = require("../module/music.m")
const Auido = require("../module/audio.m")
const fs = require('fs');
const { exec } = require('child_process');
const https = require('https');


function removeAccents(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .replace(/'/g, '');
}
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
        res.json({ path: path[0].path })
    },
    createMusic: async function (req, res) {
        name_file = 'music/' + req.body.name + '-' + req.body.singer + '.mp3'
        name_file = removeAccents(name_file)
        const file = fs.createWriteStream('./public/' + name_file);
        const request = https.get(req.body.path, function (response) {
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => {
                    exec(`python3  fingerprinting/dejavu.py --fingerprint  "${'./public/' + name_file}" `, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`Error: ${error.message}`);
                            res.json({ 'mss': error.message })
                            return;
                        }
                        songs = stdout.replace(/\r/g, '')
                        songs = songs.split("\n")
                        idx = parseInt(songs[5])
                        console.log(`python3 -c script output: ${idx}`);
                        try {
                            Music.createMusicbyID(idx, req.body.name.replace(/'/g, ''), req.body.singer.replace(/'/g, ''), './' + name_file, req.body.img)
                        }
                        catch (e) {
                            console.error(`Error: ${e}`);
                            res.json({ 'mss': e });
                            return
                        }

                    })
                    res.json({ 'mss': "ok" });
                });
            });
        }).on('error', (err) => {
            fs.unlink(destinationPath, () => {
                res.json({ 'mss': `Error downloading file: ${err.message}` });
            });
        });

    },
    deleteMusic: async function (req, res) {
        const path = await Music.deleteSongbyID(req.body.id)
        res.json({ 'mss': 'ok' })
    },
    recordAudio: async function (req, res) {
        const audioBlob = req.file.buffer;

        // Write the Blob to a WAV file
        const filePath = 'audio.wav'
        fs.writeFileSync(filePath, audioBlob);
        exec('python3   fingerprinting/dejavu.py --recognize file audio.wav  ', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            songs = stdout.replace(/\r?\n/g, '')
            // console.log(`python3 -c script output: ${songs}`);
            res.json({ message: songs });
        })
    },

}
