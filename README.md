# Import a CSV file into a MYSQL table with ease.

To use this package, simply do the following:

1. Make sure the first row of your CSV file contains the column titles for your file.


2. Make sure these column titles in your CSV file match the field names of your MYSQL db table.


3. Run 
    ```
    npm i import-csv-mysql
    ```


4. In your code, import this package, destructure & call the readCSVFile function
    ```
    const { readCSVFile } = require('import-csv-mysql')
    ```


5. Get the path of your CSV file. You can use the `path` package to achieve this easily.
    ```
    npm i path
    ```

    ```
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
        tableFields: ['pass', 'mysql', 'table', 'fieldnames', 'that', 'match', 'with', 'csv', 'column', 'titles']
    }
    ```
    If you don't have a password column in your CSV file to pass password values to dbTable, ignore the `passwordHashSalt` key-value pair.

    If you do have a password column in your CSV file to pass password values, include the `passwordHashSalt` key-value pair and pass the password salt you'll like to use to hash the passwords in your file before inserting into db. 
    
    #### **Note:**
    Do not pass an empty value to `passwordHashSalt`; if you don't have a password hashing salt, please omit the `passwordHashSalt` key-value pair entirely or pass `null` as the value.

    The value of ***tableFields*** must be an array of strings e.g. 
    
    ```

    ['first_name', 'last_name', 'email_address']
    ```


7. Pass the `fileToRead` and `dbSettings` variables as arguments to the `readCSVFile` function

    ```
    readCSVFile(fileToRead, dbSettings) 
    ```


8. Run your code.

9. If you followed these instructions, the records in your CSV file should now be imported into the mysql dbTable provided in `dbSettings`.    