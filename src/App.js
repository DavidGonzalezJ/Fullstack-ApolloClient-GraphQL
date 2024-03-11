import { useState } from 'react'
import {  Routes, Route, useNavigate
  } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
    }
  }
`

const App = () => {
  const navigate = useNavigate()
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  if(authorsResult.loading || booksResult.loading)
    return <div>loading...</div>

  return (
    <div>
      <div>
        <button onClick={() => navigate('/authors')}>authors</button>
        <button onClick={() => navigate('/books')}>books</button>
        <button onClick={() => navigate('/add')}>add book</button>
      </div>


      <Routes>
        <Route path="/" element={<h1>Main Page</h1>}/>
        <Route path="/authors" element={<Authors list={authorsResult.data.allAuthors}/>} />
        <Route path="/books" element={<Books list={booksResult.data.allBooks}/>} />
        <Route path="/add" element={<NewBook/>} />
      </Routes>      
    </div>
  )
}

export default App
