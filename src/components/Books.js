import { useState } from "react"

const Books = ({list}) => {
  const books = list
  const [genreFilter, setGenreFilter] = useState('all genres')

  const initGenreList = () => {
    let genreList = ['all genres']
    books.forEach(book => {
      if(book.genres){
        book.genres.forEach(genre => {
          if(!genreList.includes(genre))
            genreList = genreList.concat(genre)
        })
      }
    })
    return genreList
  }

  const genreList = initGenreList()

  const clickHandler = (genre) => {
    setGenreFilter(genre)
  }

  const applyFilter = () => {
    if(genreFilter === 'all genres') return books

    return books.filter(b => b.genres.includes(genreFilter))
  }

  const booksToShow = applyFilter()

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      {genreList.map(g => (<button key={g} onClick={()=>{clickHandler(g)}}>{g}</button>))}
    </div>
  )
}

export default Books
