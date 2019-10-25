
module.exports = {
    insert_person: `INSERT INTO persons(firstname, lastname, contact_no) VALUES(?, ?, ?)`,
    read_person: `SELECT * FROM persons`,
    read_person_id: `SELECT * FROM persons WHERE persons.id = ?`,
    update_person: `UPDATE persons SET persons.firstname = ?, persons.lastname = ?, contact_no=? WHERE persons.id = ?`,
    delete_person: `DELETE FROM persons WHERE persons.id = ?`
}