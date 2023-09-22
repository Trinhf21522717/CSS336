const db = require("../config/connect")
module.exports = {
    getMusic: async function () {
        var result = await db.Query("select * from Music")
        return result
    },
    getPathbyID: async function (id) {
        var result = await db.Query("select path from Music where id =" + id)
        return result
    },
    deleteSongbyID: async function (id) {

        var result = await db.Query("DELETE FROM Music WHERE  id =" + id)
        return result
    }
}