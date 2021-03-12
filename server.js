require("dotenv").config();
const express = require("express");

const { insert, select, update, deleteUser } = require("./db_connection/db_client");
let app = express();
let PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))
app.get("/", (req, res) => {

    res.json({ "message": "Hello from express, post to load data into database" });
});


app.post("/addUser", (req, res) => {


    status = insert(req.body, (msg) => {

        res.json({ msg });
    });
})
app.post("/getUser", (req, res) => {
    const { id, first_name } = req.body;
    select({ id, first_name }, (data) => {
        console.log(data);

        res.send(data);
    })
})
app.put("/updateUser", (req, res) => {


    const { id, first_name, last_name, email, password, n_password, phone_number, DOB, is_admin } = req.body
    let obj = {
        id: id || 0,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        n_password: n_password,
        phone_number: phone_number,
        DOB: DOB,
        is_admin: is_admin,


    }
    select({ id, first_name }, (results) => {


        let keysFromResults = Object.keys(results[0]);
        let keysFromBody = Object.keys(obj);
        let keyValuesFromBody = Object.entries(obj);
        let keyValuesFromResults = Object.entries(results[0]);

        let SQLOBJ = {};

        for (let iterator = 0; iterator < keysFromResults.length; iterator++) {



            //Check if current client record is null or undefined
            if (keyValuesFromBody[iterator][1] === undefined || keyValuesFromBody[iterator][1] === null) {

                //Check if current client record is not null from database
                if (keyValuesFromResults[iterator][1] !== undefined || keyValuesFromResults[iterator][1] !== null) {
                    //Handle if its not null
                    // Keep data from Database
                    SQLOBJ[keysFromResults[iterator]] = keyValuesFromResults[iterator][1];
                }



            } else {
                //If values are not null from client, push all updates to the database
                SQLOBJ[keysFromBody[iterator]] = keyValuesFromBody[iterator][1];



            }


        }

        update(SQLOBJ)
        res.json(SQLOBJ);

    })

});

app.delete("/deleteUser", (req, res) => {
    const { id, first_name } = req.body;
    deleteUser({ id, first_name }, (msg) => {
        res.send(msg);
    })

});


app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
})
