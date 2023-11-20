import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigateTo } from '../utils/common';
import { enqueueSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { SignUp , LoginNew} from '../action'

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigateTo(navigate, "/");
    }
  }, [navigate]);


  
  const handleLogin = (e) => {
    e.preventDefault();
    // Implement your login logic here, setting access_token in localStorage upon successful login
    // For example:
    const userName = e.target.login_username.value;
    const password = e.target.login_password.value;
    const payload={
        userName,
        password
    }
    setIsLoading(true);
        dispatch(
            LoginNew(payload, (data) => {
                setIsLoading(false)
                localStorage.setItem('access_token', data?.data?.access_token);
                navigateTo(navigate, "/");

            }, (err) => {
                enqueueSnackbar("Error While Login", { variant: 'error' })
            }
            )
        )
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Implement your login logic here, setting access_token in localStorage upon successful login
    // For example:
    const userName = e.target.username.value;
    const password = e.target.password.value;
    const confirm_password = e.target.confirm_password.value;
    const userType = e.target.userType.value;
    const payload={
        userName,
        password,
        userType
    };
    if (password !== confirm_password) {
      
        return alert("Password Don't Match")
    }

    setIsLoading(true);
        dispatch(
            SignUp(payload, (data) => {
                setIsLoading(false)
                console.log(data?.data)
                localStorage.setItem('access_token', data?.data);
                enqueueSnackbar("User Added Successfully!", { variant: 'success' })
                navigateTo(navigate, "/");

            }, (err) => {
                console.log(err)
                enqueueSnackbar("Error While Adding New User!, Provide unique UserName", { variant: 'error' })
            }
            )
        )
    // Perform authentication check here and set access_token in localStorage
    

  };

  return (
    <>
      {/* Your Navbar Code */}

      <nav class="navbar navbar-expand-lg">
            <div class="container">
                <a class="navbar-brand" href="/"><h1>DriveFest</h1></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
                        <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>


                        
                        
                    </ul>
                </div>
            </div>
        </nav>
        .<div className='container'>
      <div className='row'>
      <div className="hd col-6">
        <form onSubmit={handleSignUp}>
            <h3>Sign Up</h3> <br></br>
          <label>Username:</label>
          <input type="text" name="username" required /><br /><br />

          <label>Password:</label>
          <input type="password" name="password" required /><br /><br />

          <label>Repeat Password:</label>
          <input type="password" name="confirm_password" required /><br /><br />

          <label>User Type:</label>
          <select name="userType">
            <option value="driver">Driver</option>
            <option value="examiner">Examiner</option>
            <option value="admin">Admin</option>
        </select>

          <button type="submit">Sign Up</button>

        </form>
      </div>

      <div className="hd col-6">
        <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <br></br>
          <label>Username:</label>
          <input type="text" name="login_username" required /><br /><br />

          <label>Password:</label>
          <input type="password" name="login_password" required /><br /><br />

          <button type="submit">Login</button>
        </form>
      </div>
      </div>
      </div>
    </>
  );
}

export default Login;
