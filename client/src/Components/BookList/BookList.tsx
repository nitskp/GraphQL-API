import { gql, useQuery } from "@apollo/client";

const GET_BOOKS = gql`
  query RootQueryType{
    book (id:"621c5ac1767178da3d4e4b75") {
      name
      genre
    }
  }
`;

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error</p>;
  }
  return (
    <div>
      <ul className="book-list">
        {
          //  data.books.map((book:{name:string, genre:string}) => {
          //   return (
          //     <li key={book.name}>
          //       Name : {book.name}
          //       <br />
          //       Genre : {book.genre}
          //     </li>
          //   )
          //  })
          <li>
            {data.book.name}
            {data.book.genre}
          </li>
        }
      </ul>
    </div>
  );
};

export default BookList;
