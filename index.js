const fs = require('fs')
const csv = require('csv-parser')
const mysql = require('mysql')
const bcrypt = require('bcrypt')

const results = []
let passwordHashSalt = "";

const readCSVFile = (filePath, dbSettings) => {
    dbSettings.passwordHashSalt !== null || dbSettings.passwordHashSalt !== undefined ? 
    passwordHashSalt = dbSettings.passwordHashSalt : 
    passwordHashSalt = bcrypt.genSaltSync(10)

    fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', data => {
        results.push(data)
    })
    .on('end', () => {
        results.unshift()
        postToDB(results, dbSettings)
    })

}

const encryptPassword = plainPassword => {
    return bcrypt.hashSync(plainPassword, passwordHashSalt, null)
}

const postToDB = (results, dbSettings) => {
    const con = mysql.createConnection({
        host: dbSettings.host,
        user: dbSettings.user,
        password: dbSettings.password,
        database: dbSettings.dbName
    })
    
    con.connect(err => {
        if (err) throw err

        console.log("Connected to MySQL DB")

        const values = []
        const fieldNameValuePairs = [];

        results.forEach(result => {

            if (result[dbSettings.tableFields[0]].length < 1) return

            const value = [];

            for(const fieldName of dbSettings.tableFields) {

                if (fieldName !== 'password') {
                    value.push(result[fieldName])
                } else {
                    const encryptedPassword = encryptPassword(result['password'])
                    value.push(encryptedPassword)
                } 

                fieldNameValuePairs.push(`${fieldName}=VALUES(${fieldName})`)
                
            }

            values.push(value)
        })

        const sql = `INSERT INTO ${dbSettings.tableName}(${dbSettings.tableFields.toString()}) VALUES ? ON DUPLICATE KEY UPDATE ${fieldNameValuePairs.toString()}`;
    
        con.query(sql, [values], (err, result) => {
            if (err) throw err;
            console.log(result)
            con.end(err => console.log('Connection Closed'))
        })
    
    })
}

module.exports = {
    readCSVFile: readCSVFile
}