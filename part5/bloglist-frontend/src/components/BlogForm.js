import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogName, setNewBlogName] = useState('')
  const [newUrl, setNewURL] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
        title: newBlogName,
        author: newBlogAuthor,
        url: newUrl,
        likes: 0,
    })
    setNewBlogAuthor('')
    setNewBlogName('')
    setNewURL('')
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
      Blog URL:
      <input
       value={newUrl}
       onChange={event => setNewURL(event.target.value)}
      />
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm
