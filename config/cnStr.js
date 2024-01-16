// module.exports = {
//     server: 'https://sqliteonline.com/#sharedb=s%3Ahector',
//     database: 'Music',
//     user: 'quang',
//     password: 'tuanlong123!',
//     options: {
//         encrypt: true // Đảm bảo sử dụng kết nối bảo mật
//     }

// }
const fs = require('fs');
module.exports = {
    host: 'cs336.mysql.database.azure.com',
    user: "admin_cs336",
    password: "password_cs336",
    database: "demo",
    insecureAuth: true,
    port: 3306,
    ssl: { ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem") }
}

