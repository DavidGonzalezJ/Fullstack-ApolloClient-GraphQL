const Recommend = ({user, list}) => {
    const username = user.username
    const genre = user.favoriteGenre

    const applyFilter = () => {
        return list.filter(b => b.genres.includes(genre))
    }

    const booksToShow = applyFilter()

    return (
    <div>
      <h2>recommendations</h2>
      <p>Hello {username}!</p>
      <p>Here are books in your favorite genre <b>{genre}</b></p>

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
    </div>
    )
}

export default Recommend