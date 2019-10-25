const Person = require("./queries");
const personnel = new Person();

const app = async () => {
/*     let savePerson = await personnel.savePerson({
        firstname: "fname",
        lastname: "lname",
        contact_no: "09453333"
    });
    console.log("Saved data --> ", savePerson) */
	
    let isUpdated = await personnel.updatePerson({
		firstname: "xxxx",
        lastname: "qqqq",
        contact_no: "45345345",
		id: 2
	});
    // console.log("Is it updated --> ", isUpdated);

    let personList = await personnel.readPersons();
    console.log("List of persons --> ", personList);
	
    let personData = await personnel.readPerson(2);
    console.log("Person Data --> ", personData);

    let isDeleted = await personnel.deletePerson(11);
    console.log("Is it deleted --> ", isDeleted)
}

app();