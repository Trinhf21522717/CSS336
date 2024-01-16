const cnStr = require('./cnStr')
// /////////////////// Connect mssql ///////////////////
// const sql = require('mssql')
// module.exports = {
//     //get last table 
//     Query: async query => {
//         try {
//             let Pool = await sql.connect(cnStr).catch(err => { console.log(err) });
//             const eventsList = await Pool.request().query(query)
//             // sql.close()
//             return eventsList.recordset;
//         } catch (error) {
//             console.log(error)
//             sql.close()
//             return 'err'
//         }
//     }

// }


///////////////  Mysql //////////////
const mysql = require('mysql')

module.exports = {
    //get last table 

    Query: async query => {

        const connection = mysql.createConnection(cnStr);

        connection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL: ' + err.stack);
                connection.end();
                return;
            }
            // console.log('Connected to MySQL as id ' + connection.threadId);
        });
        function executeQuery(query) {
            return new Promise((resolve, reject) => {
                connection.query(query, (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        }
        // Perform a sample query
        results = await executeQuery(query);
        connection.end();
        if (typeof results != 'object')
            results = results.map(result => ({ ...result }));
        return results
    }

}

