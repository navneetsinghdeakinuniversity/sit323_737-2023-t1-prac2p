const { json } = require('express');
const express = require('express');
const app = express();

// Need to import express libraries to read Post body data (e.g. req.body)
app.use(express.json());
app.use(express.urlencoded());

// Users
let users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 30, name: 'Bob' }
];

//  Home page request
// Curl http://localhost:3000/
app.get('/', (req, res) => {
    res.send("Welcome to our server");
});


// Get all users in the array
// curl http://localhost:3000/users
app.get('/users', (req, res) => {
    res.json(users);
});

// Get a user of a specified ID
// cirl http://localhost:3000/users/-id-
app.get('/users/:id', function(req, res) {
    console.log("User ID " + req.params.id + " requested");
    var userID= req.params.id;
    var userFound = false;

    users.forEach((user, index, array) => {
        if (user.id == userID) {
            res.send(users[index]);
            userFound = true;
        }
    });

    if (userFound == false) {
        res.send("Error: User with ID " + userID + " does not exist");
    }
});

// Post a new user
// curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"id":4,"name":"emma"}'

app.post('/users', (req, res) => {

    if (req.body === undefined) {
        // if invalid data is received, probably not in JSON format
        console.log("ERROR: req.body is undefined");
        res.status(400).send("ERROR: req.body is undefined");
    }
    else {
        // Use stringify ti decide the JSON into a readable string
        userData = JSON.stringyfy(req.body);
        console.log("Adding new user with data: " + userData);
        // Array to store JSON
        const newUser = req.body; 
        users.push(newUser); 
        res.status(201).json(newUser); 
    }
});

// Deleting existing user using ID
// curl -X DELETE http://localhost:3000/users/-id-
app.delete('/users/:id', (req, res) => {
    // Retrieve the user ID from the parameter named 'id' in the URL
    const userID = parseInt(req.params.id);

    // Remoce the user if exists
    users = users.filter(user => user.id !== userId);
    res.status(204).send(); 
});

// Updating a user with an existing ID
// curl -X PUT http://localhost:3000/users/-id- -H "Content-Type: application/json" -d '{"id":55,"name":"doona"}'
app.put('/users/:id', (req, res) => {

    // Retrieve the user ID from the parameter named 'id' in the URL
    const userId = parseInt(req.params.id);

    // Retrieve the PUT data of the user (using -d flag in curl)
    const updatedUser = req.body; 

    // If ID exists, update the user
    users = users.map(user => user.id === userId ? updatedUser : user);
    res.status(200).json(updatedUser); // 200 means successfull 
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
