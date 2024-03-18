import {  Routes, Route, useNavigate
  } from 'react-router-dom'
import { useQuery, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { useState } from 'react'
import Recommend from './components/Recommend'


const App = () => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const navigate = useNavigate()
  const client = useApolloClient()
  const authorsResult = useQuery(ALL_AUTHORS)
  const booksResult = useQuery(ALL_BOOKS)

  if(authorsResult.loading || booksResult.loading)
    return <div>loading...</div>

  return (
    <div>
      <div>
        <button onClick={() => navigate('/authors')}>authors</button>
        <button onClick={() => navigate('/books')}>books</button>
        {token && 
          <button onClick={() => navigate('/add')}>add book</button> &&
          <button onClick={() => navigate('/recommend')}>recommend</button>
        }
        {!token && <button onClick={() => navigate('/login')}>login</button>}
        {token && <button onClick={() => {
          setToken(null)
          setUser(null)
          localStorage.clear()
          client.resetStore()
          navigate('/')
        }}>logout</button>}
      </div>


      <Routes>
        <Route path="/" element={<h1>Main Page</h1>}/>
        <Route path="/authors" element={<Authors list={authorsResult.data.allAuthors}/>} />
        <Route path="/books" element={<Books list={booksResult.data.allBooks}/>} />
        <Route path="/add" element={<NewBook/>} />
        <Route path="/login" element={<LoginForm setToken={setToken} setUser={setUser}/>} />
        <Route path="/recommend" element={<Recommend user={user} list={booksResult.data.allBooks}/>} />
      </Routes>      
    </div>
  )
}

export default App
