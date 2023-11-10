const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  // Create empty array to hold the students
  const users = [];

  // Loop 20 times -- add students to the students array
  const chosenUsernames = new Set();
const chosenEmails = new Set();

for (let i = 0; i < 5; i++) {
  let username, email;

  do {
    // Generate a random username and email
    username = getRandomName(5);
    email = username + '@gmail.com';
  } while (chosenUsernames.has(username) || chosenEmails.has(email));

  // Add the username and email to their respective sets to mark them as chosen
  chosenUsernames.add(username);
  chosenEmails.add(email);

  // Get some random assignment objects using a helper function that we imported from ./data
  const thoughts = getRandomThought(5);

  users.push({
    email,
    username,
    thoughts,
  });
}


  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results
  await Thought.collection.insertOne({
    thoughtName: 'My First Thought',
    users: [...users],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
