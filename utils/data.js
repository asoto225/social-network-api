// Purpose: to generate 100 random names and thoughts for the app
const names = [
        'Grace',
        'Graham',
        'Tamar',
        'Alex',
        'Mark',
        'Tamar',
        'Farish',
        'Sarah',
        'Nathaniel',
        'Parker',
        'John'
]

const getRandomName = () => {
    return names[Math.floor(Math.random() * names.length)];
}

// const thoughts = [
//     'I love coding!',
//     'I love pizza!',
//     'I love dogs!',
//     'I love cats!',
//     'I love hiking!',
//     'My feet hurt!',
//     'My feet stink!'
// ];

// get a random item given an array
// const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// get a random name from the names array

// get a random thought from the thoughts array and assign it to a random name
// const getRandomThought = () => {
//     // const randomName = getRandomName();
//     const randomThought = getRandomArrItem(thoughts);

//     return randomThought;
// };


// get a random thought from the thoughts array and assign it to a random name
const getRandomThought = (count) => {
    const thoughts = [
        'I love coding!',
        'I love pizza!',
        'I love ramen!',
        'I live in a house!',
        'I love hiking!',
        'My feet hurt!',
        'My feet stink!'
    ];


    const randomThoughts = [];

    for (let i = 0; i < count; i++) {
        randomThoughts.push({
            thoughtText: thoughts[Math.floor(Math.random() * thoughts.length)]
        });
    }
    console.log(randomThoughts);
    return randomThoughts;
}
module.exports = { getRandomName, getRandomThought };
