const INSERT = "INSERT";
const UPDATE = "UPDATE";
const SELECT = "SELECT";
const DELETE = "DELETE";


const sqlify = (data, operation) => {

    const { id, first_name, last_name, email, password, n_password, phone_number, DOB, is_admin } = data;
    if (operation === INSERT) {

        return { first_name: first_name, last_name: last_name, email: email, password: password, n_password: n_password, phone_number: phone_number, DOB: sqlifyDate(DOB), is_admin: is_admin }

    } else if (operation === SELECT) {
        return { id: id, first_name: first_name, last_name: last_name, email: email, password: password, n_password: n_password, phone_number: phone_number, DOB: sqlifyDate(DOB), is_admin: is_admin }

    } else if (operation === UPDATE) {
        return {
            updates: { first_name: first_name, last_name: last_name, email: email, password: password, n_password: n_password, phone_number: phone_number, DOB: sqlifyDate(DOB), is_admin: is_admin },
            verify: { first_name: first_name, id: id }
        };
    } else if (operation === DELETE) {
        return { id: id, first_name: first_name }
    }
}




const sqlifyDate = (clientDateData) => {

    if (clientDateData) {
        let date = new Date(clientDateData);

        return date
    }


}


module.exports = {
    sqlify: sqlify,
}