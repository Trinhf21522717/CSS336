const db = require("../config/connect")
module.exports = {
    getMusic: async function () {
        var result = await db.Query("select * from summarysong")
        return result
    },
    getPathbyID: async function (id) {
        var result = await db.Query("select path from summarysong where song_id =" + id)
        return result
    },
    deleteSongbyID: async function (id) {

        var result = await db.Query("DELETE FROM songs WHERE  song_id =" + id)
        return result
    },
    createMusicbyID: async function (song_id, name, singer, path, img) {
        var result = await db.Query(`INSERT INTO summarysong (song_id,name, singer, path, img) VALUES	(${song_id},N'${name}', N'${singer}', N'${path}',N'${img}')`)
        return result
    }
}