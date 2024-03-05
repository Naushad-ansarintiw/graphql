// server.js
const express = require('express');
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const path = require('path');
const connectDB = require('./db/conn');
const fs = require('fs');

// Import the User model
const { User } = require('./models/user'); // Replace this with the actual path to your User model
const app = express();
app.use(express.json()); // Add this middleware to parse JSON requests
dotenv.config();
connectDB();


// Load the GraphQL schema from schema.gql
const schemaString = fs.readFileSync(path.join(__dirname, './schema.gql'), 'utf8');
// console.log(schemaString);
const schema = buildSchema(schemaString);

const root = {
    getUser: async ({ id }) => {
        return await User.findById(id);f
    },
    getAllUsers: async () => {
        return await User.find();
    },
    createUser: async ({ input }) => {
        // console.log("HD");
        console.log(input);
        const user = new User(input);
        await user.save();
        return user;
    },
    deleteUser: async ({ id }) => {
        return await User.findByIdAndDelete(id);
    },
};


app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    console.log("Demo2");

    console.log("Checking Something");

});
