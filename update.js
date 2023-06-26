const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/crud', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const Schema = mongoose.Schema;
const mySchema = new Schema({
  name: String,
  age: Number,
  email: String
});

const MyModel = mongoose.model('mymodels', mySchema);


  app.put('/data/:id', (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    MyModel.findByIdAndUpdate(id, newData, { new: true })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(500).json({ error: 'An error occurred' });
      });
  });


  const port = 8000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
    