const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://aastharathi0404:kavitarathi29@cluster0.bciml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  
})

.then(() => console.log('MongoDB connected!'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

const bookRoutes = require('./routes/bookRoutes');
app.use('/api', bookRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
