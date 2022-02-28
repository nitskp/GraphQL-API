const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const  schema  = require("./schema/schema");
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb://localhost/GraphQlAPITest',()=>{
  console.log('Database connected')
})

app.use(cors())

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server listeninig on Port ${PORT}`));
