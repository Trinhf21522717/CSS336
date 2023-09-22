const sql = require('mssql')
const cnStr = require('./cnStr')
module.exports = {
    //get last table 
    Query: async query => {
        try {
            let Pool = await sql.connect(cnStr).catch(err => { console.log(err) });
            const eventsList = await Pool.request().query(query)
            // sql.close()
            return eventsList.recordset;
        } catch (error) {
            console.log(error)
            sql.close()
            return 'err'
        }
    }

}
