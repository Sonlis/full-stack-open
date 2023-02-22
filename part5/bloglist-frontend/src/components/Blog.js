import { useState } from 'react'

const Blog = ({ blog, increaseLikes }) => {
  const [fullFiew, setFullView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleFullView = () => {
    setFullView(!fullFiew)
  }

  return (
    <div style={blogStyle}>
      <div>
          {!fullFiew && <div>{blog.title} {blog.author} <button onClick={toggleFullView}>View more</button></div>}
          {fullFiew && <div>{blog.title} By {blog.author}<button onClick={toggleFullView}>Hide</button>
            <br />
            Likes: {blog.likes} <button onClick={_ => increaseLikes(blog)}>Like</button>
            <br />
            URL: {blog.url}
            <br />
            {blog.user.username}
            </div>}

      </div>
    </div>
  )
}

export default Blog
