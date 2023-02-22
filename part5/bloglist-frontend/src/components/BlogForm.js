import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogName, setNewBlogName] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
        title: newBlogName,
        author: newBlogAuthor
    })
    setNewBlogAuthor('')
    setNewBlogName('')
 }

  return (
    <form onSubmit={addBlog}>
      Blog name:
      <input
        value={newBlogName}
        onChange={event => setNewBlogName(event.target.value)}
      />
      Blog author:
       <input
        value={newBlogAuthor}
        onChange={event => setNewBlogAuthor(event.target.value)}
      />
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm
