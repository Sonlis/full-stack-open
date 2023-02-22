import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs.js'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm.js'
import Togglable from './components/Togglable.js'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    async function getInitialsBlogs(){
        const initialBlogs = await blogService.getAll()
        initialBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(initialBlogs)
    }
    getInitialsBlogs()
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
  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(blogObject)
    setBlogs(response)
    setErrorMessage(`${blogObject.title} by ${blogObject.author} created`)
    setTimeout(() => {
        setErrorMessage(null)
    }, 5000)
    }

  const increaseLikes = async (blogObject) => {
      blogObject.likes += 1
      const response = await blogService.update(blogObject.id, blogObject)
      response.sort((a, b) => b.likes - a.likes);
      setBlogs(response)
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

  const blogFormRef = useRef()
  return (
    <div>
      <h1>Blogs app</h1>
      <Notification message={errorMessage} />
      {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }
      {user && <div>
      {user &&
    <div>
        <p>{user.name} logged in</p> <button onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <BlogForm
            username={username}
            password={password}
            createBlog={createBlog}
          />
        </Togglable>
    </div>
      }
        </div>
      }
      <ul>
        <ul>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              increaseLikes={increaseLikes}
            />
          )}
        </ul>
      </ul>
    </div>
  )
}

export default App
