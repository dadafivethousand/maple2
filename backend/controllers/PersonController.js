const Person = require('../Models/Person');

// Controller logic for creating a new person (POST request)
exports.createPerson = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, streetAddress, postalCode, province, city } = req.body;
    const person = new Person({
      firstName,
      lastName,
      email,
      phone,
      streetAddress,
      postalCode,
      province: province || 'ON',  // Default to ON
      city: city || 'Vaughan'      // Default to Vaughan
    });
    await person.save();
    res.status(201).json({ message: 'Person created successfully!', person });
  } catch (error) {
    res.status(500).json({ message: 'Error creating person', error });
  }
};

// Controller logic for retrieving all persons (GET request)
exports.getAllPersons = async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving persons', error });
  }
};

// Controller logic for searching a specific person by email, phone, name, or address (GET request)
exports.getPersonBySearch = async (req, res) => {
  try {
    const { search } = req.query;
    const person = await Person.findOne({
      $or: [
        { email: search },
        { phone: search },
        { firstName: new RegExp(search, 'i') },
        { lastName: new RegExp(search, 'i') },
        { streetAddress: new RegExp(search, 'i') }
      ]
    });
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: 'Error finding person', error });
  }
};
