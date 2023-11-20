import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { navigateTo } from '../utils/common';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { GetCar , SubmitCar} from '../action'

function Learning() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");


  const dispatch = useDispatch();
  

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      dispatch(
      GetCar({}, (data) => {
        console.log(data)
        setUserType(data?.data?.userType)
        if(data?.data?.licenseNumber.length <= 0 && userType === "driver"){
            navigateTo(navigate, "/gtest2");
        }else
        {
          navigateTo(navigate, "/");
      }
        

    }, 
    (err) => {
        enqueueSnackbar("Error While Login", { variant: 'error' })
    },
    localStorage.getItem("access_token")
    )
      )
    }
}, [])

  
  
const handleLogout=(e) => {
  localStorage.removeItem("access_token");
  navigateTo(navigate, "/");
}

  return (
      <>
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <a class="navbar-brand" href="/"><h1>DriveFest</h1></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item"><a class="nav-link" href="/">Home</a></li>

                        {userType === "driver" ? (
                          <>
                            <li className="nav-item"><a className="nav-link" href="/gtest">GTest</a></li>
                            <li className="nav-item"><a className="nav-link" href="/gtest2">GTest2</a></li>
                            <li className="nav-item"><a className="nav-link" onClick={handleLogout}>Logout</a></li>
                          </>
                        ) : userType === "examiner" ? (
                          <>
                            <li className="nav-item"><a className="nav-link" href="/examiner">CheckAnswers</a></li>
                            <li className="nav-item"><a className="nav-link" onClick={handleLogout}>Logout</a></li>
                          </>
                        ) : userType === "admin" ? (
                          <>
                            <li className="nav-item"><a className="nav-link" href="/admin">Appointment</a></li>
                            <li className="nav-item"><a className="nav-link" onClick={handleLogout}>Logout</a></li>
                          </>
                        ) : (
                          <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
                        )}


                        
                        
                    </ul>
                </div>
            </div>
        </nav>

        <div class="dash">
            <h1>Dashboard</h1>
        </div>

    </>

  )
}

export default Learning