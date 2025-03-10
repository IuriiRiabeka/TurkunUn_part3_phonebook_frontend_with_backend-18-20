require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person'); 

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));
app.use(morgan('tiny'));

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch persons' });
    });
});

app.get('/info', (req, res) => {
  Person.countDocuments()
    .then((count) => {
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch count' });
    });
});


app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});


app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});


app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'Name or number missing' });
  }

  const newPerson = new Person({ name, number });

  newPerson
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error));
});
app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  const updatedPerson = { name, number };

  Person.findByIdAndUpdate(
    req.params.id,
    updatedPerson,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch(error => next(error));
});


const PORT = process.env.PORT || 3001;
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Malformatted ID' });
  }
  next(error);
};
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
