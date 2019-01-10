require('dotenv').config();
require('./src/initModels');

const mongoose = require('mongoose');

const server = require('./server');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err) => {
  if (err) process.exit(1);

  server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
});

process.on('beforeExit', async () => {
  await mongoose.disconnect();
});
