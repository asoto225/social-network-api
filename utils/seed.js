const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users and thoughts
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create empty array to hold the users and thoughts
  const users = [];
  const thoughts = [];

  // Loop 10 times -- add users and thoughts to the arrays
  const chosenUsernames = new Set();
  const chosenEmails = new Set();

  for (let i = 0; i < 10; i++) {
    let username, email;

    do {
      // Generate a random username and email
      username = getRandomName();
      email = username + '@gmail.com';
    } while (chosenUsernames.has(username) || chosenEmails.has(email));

    // Add the username and email to their respective sets to mark them as chosen
    chosenUsernames.add(username);
    chosenEmails.add(email);

    // Get some random thought objects using a helper function that we imported from ./data
    const userThoughts = getRandomThought(10);

    users.push({
      email,
      username,
    });

    thoughts.push({
      thoughtName: `Thought ${i + 1}`,
      user: users[i]._id, // Associate the thought with the user using the user's ID
      thoughts: userThoughts,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
