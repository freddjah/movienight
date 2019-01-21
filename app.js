require('dotenv').config();
require('./src/initModels');

const schedule = require('node-schedule');

const mongoose = require('mongoose');

const server = require('./server');
const jobs = require('./jobs');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err) => {
  if (err) process.exit(1);

  mongoose.model('List').find({}).then(async (lists) => {
    if (lists.length === 0) await jobs.getLists();
  });

  schedule.scheduleJob('0 0 16 * * *', async () => {
    await jobs.getLists();
  });

  server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
});

process.on('beforeExit', async () => {
  await mongoose.disconnect();
});
