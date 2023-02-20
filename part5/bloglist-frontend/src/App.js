import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogName, setNewBlogName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    try {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    } catch (exception) {
        setErrorMessage('Could not log out')
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
        title: newBlogName,
        author: newBlogAuthor
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlogName('')
        setNewBlogAuthor('')
      })
    setErrorMessage(`${blogObject.title} by ${blogObject.author} created`)
  }

  const handleBlogChangeName = (event) => {
    setNewBlogName(event.target.value)
  }

  const handleBlogChangeAuthor = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      Blog name:
      <input
        value={newBlogName}
        onChange={handleBlogChangeName}
      />
      Blog author:
       <input
        value={newBlogAuthor}
        onChange={handleBlogChangeAuthor}
      />
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      <h1>Blogs app</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p> <button onClick={handleLogout}>Logout</button>
          {blogForm()}
        </div>
      }
      <ul>
        <ul>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
            />
          )}
        </ul>
      </ul>
    </div>
  )
}

export default App
