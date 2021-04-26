#### Import a CSV file into a MYSQL table with ease.

To use this package, simply do the following:

1. Make sure the first row of your CSV contains the column titles for your file.
2. Make sure these column titles in your CSV file match the field names of your MYSQL db table.
3. Run 
    ```
    npm i import-csv-mysql
    ```
4. In your code, import this package, destructure & call the readCSVFile function
    ```
    const { readCSVFile } = require('import-csv-mysql')
    ```

5. Get the path of your CSV file. You can use the 'path' package to achieve this easily.
    ```
    npm i path

    const path = require('path')

    const root = path.parse(process.cwd()).root
    const fileToRead = path.join(root, 'path', 'to', 'your', 'file.csv')
    ```

6. Provide valid values for the following keys:

    ```
    const dbSettings = {
        host: 'xxxx',
        user: 'xxxx',
        password: 'xxx',
        dbName: 'xxx',
        tableName: 'xxx',
        passwordHashSalt: 'xxx',	
        tableFields: [xxx-enter-mysql-table-fieldnames-that-match-with-csv-column-names-xxx]
    }
    ```
7. Pass the fileToRead and dbSettings variables to the readCSVFile function

    ```
    readCSVFile(fileToRead, dbSettings) 
    ```