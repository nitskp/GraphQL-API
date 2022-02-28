const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// dummy data
// let books = [
//   { name: "Beware of chicken", genre: "Fantasy", id: "1", authorId: "1" },
//   { name: "Against the Gods", genre: "Fantasy", id: "2", authorId: "2" },
//   {
//     name: "The subtle art of not giving a fuck",
//     genre: "Self-help",
//     id: "3",
//     authorId: "3",
//   },
//   { name: "Orochimama", genre: "Fantasy", id: "4", authorId: "1" },

//   { name: "Godan", genre: "Fantasy", id: "5", authorId: "1" },
// ];

// let authors = [
//   { name: "CasualFarmer", age: 28, id: "1" },
//   { name: "Mars Gravity", age: 39, id: "2" },
//   { name: "Don't Know", age: 45, id: "3" },
// ];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorID)
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({authorID:parent.id})
      }
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db
        return Book.findById(args.id)
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id)
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find()
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
         return Author.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString)  },
        age: { type: new GraphQLNonNull(GraphQLInt)  },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()
      },
    },
    addBook: {
      type: BookType,
      args:{
        name:{type: new GraphQLNonNull(GraphQLString) },
        genre: {type: new GraphQLNonNull(GraphQLString) },
        authorID: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorID: args.authorID
        })

        return book.save()
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
