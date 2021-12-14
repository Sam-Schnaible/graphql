const express = require('express');
const { buildSchema} = require('graphql');
const { graphqlHTTP} = require('express-graphql');

const app = express();

const schema = buildSchema(`

  type User {
    name: String!
    age: Int!
    college: String
  }

  type Query {
    hello: String!
    welcomeMessage(name: String, dayOfWeek: String!): String
    getUser: User
    getUsers: [User]
  }
`)

const root = {
  getUser: () => {
    return {
      name: 'Sam',
      age: 37,
      college: 'UCSB'
    }
  },
  hello: () => {
    return 'Hello world!';
  },
  welcomeMessage: args => {
    console.log(args);
    return `Hey ${args.name}, what's up? How's your ${args.dayOfWeek}?`;
  },
  getUsers: () => {
    const users = [
      {
        name: 'Sam',
        age: 37,
        college: 'UCSB'
      },
      {
        name: 'Billy',
        age: 27,
        college: 'Stanford'
      }
    ]
    return users;
  }
}

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema,
  rootValue: root
}));



app.listen(3001, () => console.log(`Server on port 3001`));