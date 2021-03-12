const db = require("mysql");
const { sqlify } = require("../util/sqlify");
const dbClient = db.createConnection({
    host: process.env.DB_HOST,
    port: process.env.BD_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'userInformation',
    insecureAuth: true

});

const INSERT = "INSERT";
const UPDATE = "UPDATE";
const DELETE = "DELETE";
const SELECT = "SELECT";

module.exports = {


    connect: () => {

        let status = 0;

        dbClient.connect((error) => {
            if (error) {
                console.error(error);
                status = error;
            } else {
                console.log("connected to mysql-server");
            }
        });


        return status;

    },

    insert: (data, queryResult) => {
        let status = "OK!"
        data = sqlify(data, INSERT);
        dbClient.query(`INSERT INTO user SET ?`, data, (error, results, fields) => {
            if (error) {
                console.error(error);
                queryResult(error);
                return;
            };

            queryResult({ "msg": "User entered into database" });

        })


    },

    select: (data, transferData) => {
        let status = "OK";

        dbClient.query(`SELECT * FROM user WHERE id = ? AND first_name = ?`, [data.id, data.first_name], (error, results, fields) => {
            if (error) {
                console.error(error);
            } else {

                transferData(results);
            }
        });

    },


    update: (data) => {

        data = sqlify(data, UPDATE)
        const { verify: { first_name, id }, updates } = data;
        console.log(first_name);
        console.log(id);
        dbClient.query(`UPDATE user SET ? WHERE id = ? AND first_name = ?`, [updates, id, first_name], (error, results, fields) => {
            if (error) {
                console.error(error);
                return;
            };

        });



    },

    deleteUser: (data, queryResult) => {
        data = sqlify(data, DELETE);
        dbClient.query(`DELETE FROM user WHERE id = ? AND first_name = ?`, [data.id, data.first_name], (error, results, fields) => {
            if (error) {
                console.error(error);
            } else {
                queryResult(results);
            }
        });
    }

}





