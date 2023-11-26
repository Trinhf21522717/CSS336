// // Connect mssql 
// const sql = require('mssql')
// const cnStr = require('./cnStr')
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


///////////////  SQLITE //////////////
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
// Lệnh khở tạo tabel trong database
// const db = new sqlite3.Database('music.db');
// const sqlScript = fs.readFileSync('SQLMusic.sql', 'utf8');
// db.exec(sqlScript, (err) => {
//     if (err) {
//         console.error('Error executing SQL script:', err.message);
//     } else {
//         console.log('SQL script executed successfully.');
//     }

//     // Close the database connection
//     db.close();
// });


module.exports = {
    //get last table 
    Query: async query => {
        const db = new sqlite3.Database('music.db');
        // Wrap the database operations in a Promise for async/await
        const queryPromise = (sql, params) => {
            return new Promise((resolve, reject) => {
                db.all(sql, params, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        };

        try {
            // Execute the SELECT query
            const rows = await queryPromise(query, []);
            return rows
        } catch (err) {
            console.error('Error executing SELECT query:', err.message);
        } finally {
            // Close the database connection
            db.close();
        }
    }


}
