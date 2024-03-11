import { UPDATE_BIRTHYEAR, ALL_AUTHORS } from "../queries"
import { useState } from "react"
import { useMutation } from "@apollo/client"

const BirthForm = () => {
  const [name, setName] = useState('')
  const [birth, setBirth] = useState('')

  const [updateAuthor] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{query:ALL_AUTHORS}],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
      console.log('WUT')
    }
  })

  const submit = (event) => {
    event.preventDefault()
    const setBornTo = parseInt(birth)
    updateAuthor({ variables: {name, setBornTo}})

    setName('')
    setBirth('')
  }

  return (
    <>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={birth}
            onChange={({ target }) => setBirth(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  )
}

const Authors = ({list}) => {
  const authors = list

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthForm />

    </div>
  )
}

export default Authors
