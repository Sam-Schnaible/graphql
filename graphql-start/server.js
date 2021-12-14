const express = require('express');
const { buildSchema} = require('graphql');
const { graphqlHTTP} = require('express-graphql');

const app = express();

const schema = buildSchema(`

`)

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema,
  rootValue: root
}));



app.listen(3001, () => console.log(`Server on port 3001`));