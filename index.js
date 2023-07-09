const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/medicineDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

// Create Mongoose schema and model
const medicineSchema = new mongoose.Schema({
  name: String,
  genericName: String,
  distributors: [String],
  priceDifference: Number,
});

const Medicine = mongoose.model('Medicine', medicineSchema);

// Adding dummy data
const dummyMedicines = [
    {
      name: 'Medicine A',
      genericName: 'Generic A',
      distributors: ['Distributor A', 'Distributor B'],
      priceDifference: 5,
    },
    {
      name: 'Medicine B',
      genericName: 'Generic B',
      distributors: ['Distributor C', 'Distributor D'],
      priceDifference: 8,
    },
    // Add more dummy data here
  ];
  
  // Remove existing medicines and add dummy medicines
  Medicine.deleteMany({})
    .then(() => Medicine.create(dummyMedicines))
    .then(() => console.log('Dummy data added'))
    .catch((err) => console.error('Error adding dummy data', err));
  



const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
    Medicine.find()
      .then(allMedicines => {
        res.render('index', { medicines: allMedicines });
      })
      .catch(err => {
        console.error('Error retrieving medicines', err);
        res.render('index', { medicines: [] }); // Pass an empty array if there's an error
      });
  });
  
  // Search route
  app.post('/search', (req, res) => {
    const searchTerm = req.body.searchTerm;
  
    Medicine.find({ name: searchTerm })
      .then(foundMedicines => {
        res.render('index', { medicines: foundMedicines });
      })
      .catch(err => {
        console.error('Error searching medicines', err);
        res.redirect('/');
      });
  });
  
  // Medicine details route
  app.get('/medicine/:id', (req, res) => {
    const medicineId = req.params.id;
  
    Medicine.findById(medicineId)
      .then(foundMedicine => {
        res.render('medicine', { medicine: foundMedicine });
      })
      .catch(err => {
        console.error('Error retrieving medicine details', err);
        res.redirect('/');
      });
  });
  

  
// Start the server
const port = 3051;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
