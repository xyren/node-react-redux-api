const dbConnection = require("./connection");
const queries = require("./query");

module.exports = class Person {
  async savePerson(data) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let savedPerson = await con.query(
        queries.insert_person,
        [data.firstname, data.lastname, data.contact_no]
      );
      await con.query("COMMIT");
      data.id = savedPerson.insertId;
      return data;
    } catch (ex) {
      await con.query("ROLLBACK");
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }

  async updatePerson(data) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      await con.query(queries.update_person, [
        data.firstname,
        data.lastname,
		data.contact_no,
        data.id
      ]);
      await con.query("COMMIT");
      return true;
    } catch (ex) {
      await con.query("ROLLBACK");
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }

  async deletePerson(id) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      await con.query(queries.delete_person, [id]);
      await con.query("COMMIT");
      return true;
    } catch (ex) {
      await con.query("ROLLBACK");
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }

  async readPerson(id) {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let data = await con.query(queries.read_person_id, id);
      await con.query("COMMIT");
      data = JSON.parse(JSON.stringify(data));
      return data;
    } catch (ex) {
      await con.query("ROLLBACK");
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }

  async readPersons() {
    let con = await dbConnection();
    try {
      await con.query("START TRANSACTION");
      let data = await con.query(queries.read_person);
      await con.query("COMMIT");
      data = JSON.parse(JSON.stringify(data));
      return data;
    } catch (ex) {
      console.log(ex);
      throw ex;
    } finally {
      await con.release();
      await con.destroy();
    }
  }
};
