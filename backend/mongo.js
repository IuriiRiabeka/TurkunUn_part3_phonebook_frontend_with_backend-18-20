const mongoose = require('mongoose')


const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];


if (!password) {
  console.log('Please provide a password: node mongo.js <password>');
  process.exit(1);
}

const url =
  "mongodb+srv://sam2fly7:</myPassword>@cluster0.mhvae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (name && number) {
  const person = new Person({
    name,
    number,
  });
person
    .save()
    .then(() => {
      console.log(` Added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
    .catch(error => {
      console.error(' Error adding person:', error);
      mongoose.connection.close();
    });


} else {
  Person.find({})
    .then(result => {
      console.log(' Phonebook:');
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    })
    .catch(error => {
      console.error(' Error fetching persons:', error);
      mongoose.connection.close();
    });
}