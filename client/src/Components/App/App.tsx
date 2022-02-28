import BookList from "../BookList/BookList";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>My reading List</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
