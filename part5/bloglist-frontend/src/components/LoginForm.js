const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => (
    <div>
        <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div>
                username
              <input
                  type="text"
                  value={username}
                  name="Username"
                  onChange={handleUsernameChange}
                />
              </div>
              <div>
                password
                  <input
                  type="password"
                  value={password}
                  name="Password"
                  onChange={handlePasswordChange}
                />
              </div>
              <button type="submit">login</button>
        </form>
    </div>
)

export default LoginForm
