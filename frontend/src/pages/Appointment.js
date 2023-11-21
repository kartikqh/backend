import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { navigateTo } from '../utils/common';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { GetCar , getAvailableSlotsForDate } from '../action'

function Appointment() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      dispatch(
      GetCar({}, (data) => {
        console.log(data)
        setUserType(data?.data?.userType)
        if(data?.data?.licenseNumber.length <= 0 && userType === "driver"){
            navigateTo(navigate, "/gtest2");
        }else if(userType === "driver")
        {
          navigateTo(navigate, "/gtest");
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

useEffect(() => {
  setLoading(true);
  getAvailableSlots(); // Function to fetch available slots for the selected date
}, [selectedDate]);

const getAvailableSlots = async () => {
  try {
     // API call to fetch slots
    setAvailableSlots(slots);
  } catch (error) {
    // Handle error fetching available slots
    console.error('Error fetching available slots:', error);
  } finally {
    setLoading(false);
  }
};

const handleDateChange = (date) => {
  setSelectedDate(date);
};

const addSlot = async (time) => {
  try {
    e.preventDefault();
    const id = localStorage.getItem('access_token')
  const payload={
    date: selectedDate,
    time: time
  }
  setLoading(true);
  dispatch(
    SubmitAppointment(payload, (data) => {
        setLoading(false)
        enqueueSnackbar("Details Added Successfully", { variant: 'success' })
        navigateTo(navigate, "/admin");

    }, (err) => {
        console.log(err)
        enqueueSnackbar(err?.response?.data?.error, { variant: 'error' })
    },
    localStorage.getItem("access_token")
    )
)// API call to add appointment slot
    getAvailableSlots(); // Refresh available slots after adding
  } catch (error) {
    // Handle error adding appointment slot
    console.error('Error adding appointment slot:', error);
  }
};
  
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

        <div className="container">
        <h2>Appointment View</h2>
        <div>
          {/* Calendar component for date selection */}
          {/* Date picker library or your own implementation */}
          <input type="date" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)} />
        </div>
        <div>
          <h3>Available Slots for {selectedDate.toDateString()}</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {availableSlots.map((slot) => (
                <li key={slot.id}>
                  {slot.time}{' '}
                  <button disabled={!slot.isTimeAvailable} onClick={() => addSlot(slot.time)}>
                    Add Slot
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

    </>

  )
}

export default Appointment