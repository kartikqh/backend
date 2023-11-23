import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigateTo } from '../utils/common';
import { enqueueSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { GetCar , SubmitCar, getAvailableSlotsForDateClient} from '../action'

function GTest2() {
 const getFormattedDate = (dateObject) => {
        const day = dateObject.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if needed
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, hence adding 1
        const year = dateObject.getFullYear();
        
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
        }
  const id = localStorage.getItem('access_token')
  const payGet ={};
  const navigate = useNavigate();
  const handleLogout=(e) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    navigateTo(navigate, "/");
  }

  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [initialfirstName, setIntialFirstName] = useState("");
  const [initiallastName, setIntialLastName] = useState("");
  const [intilallicenseNumber, setIntialLicenseNumber] = useState("");
  const [year, setYear] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDOB] = useState("");
  const [age, setAge] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [selectedDate, setSelectedDate] = useState(getFormattedDate(new Date()));
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const dispatch = useDispatch();


  useEffect(() => {
    setIsLoading(true);
    getAvailableSlots(); // Function to fetch available slots for the selected date
  }, [selectedDate]);
  
  const getAvailableSlots = async () => {
    try {
      const payload={
        date: getFormattedDate(new Date(selectedDate))
      }
      dispatch(
        getAvailableSlotsForDateClient(payload, (data) => {
            setIsLoading(false)
  
            setAvailableSlots(data?.data);
            navigateTo(navigate, "/gtest2");
    
        }, (err) => {
            console.log(err)
            setAvailableSlots([]);
        },
        localStorage.getItem("access_token")
        )
    )
  
      
    } catch (error) {
      // Handle error fetching available slots
      console.error('Error fetching available slots:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDateChange = (date) => {
    console.log(date)
    if (new Date(date) >= new Date()){
  
      setSelectedDate(date);
    }
    else{
      enqueueSnackbar('Please select current or upcoming date', { variant: 'error' })
    }
    
  };
  useEffect(() => {
    dispatch(
        GetCar(payGet, (data) => {
            console.log(data)
            setFirstName(data?.data?.firstName)
            setLastName(data?.data?.lastName)
            setIntialFirstName(data?.data?.firstName)
            setIntialLastName(data?.data?.lastName)
            setLastName(data?.data?.lastName)
            setDOB(data?.data?.dob)
            setAge(data?.data?.age)
            setLicenseNumber(data?.data?.licenseNumber)
            setPlateNumber(data?.data?.carDetails?.plateNumber)
            setMake(data?.data?.carDetails?.make)
            setModel(data?.data?.carDetails?.model)
            setYear(data?.data?.carDetails?.year)
            setIntialLicenseNumber(data?.data?.licenseNumber)
            setSelectedDate(data?.data?.appointment_id?.date)
            setSelectedSlot(data?.data?.appointment_id)
            getAvailableSlots()

        }, 
        (err) => {
            console.log(err)
            enqueueSnackbar(err?.response?.data?.error, { variant: 'error' })
        },
        localStorage.getItem("access_token")
        )
    )
    
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = localStorage.getItem('access_token')
    const payload={

        firstName,
        lastName,
        dob,
        age,
        licenseNumber,
        carDetails:{
            make,
            model,
            year,
            plateNumber
        },
        appointment_id: selectedSlot
    }
    setIsLoading(true);
        dispatch(
            SubmitCar(payload, (data) => {
                setIsLoading(false)
                enqueueSnackbar("Details Added Successfully", { variant: 'success' })
                navigateTo(navigate, "/gtest");

            }, (err) => {
                console.log(err)
                enqueueSnackbar(err?.response?.data?.error, { variant: 'error' })
            },
            localStorage.getItem("access_token")
            )
        )
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
                        <li className="nav-item"><a className="nav-link" href="/gtest">GTest</a></li>
                        <li className="nav-item"><a className="nav-link" href="/gtest2">GTest2</a></li>
                        <li className="nav-item"><a className="nav-link" onClick={handleLogout}>Logout </a></li>
    
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
        <form onSubmit={handleSubmit}>

            <div class="form-group">
                <label for="firstName">First Name:</label>
                { initialfirstName.length <=0?<input type="text" class="form-control" id="firstName" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />:
                <input type="text" class="form-control" id="firstName" placeholder="Enter First Name" value={firstName} readOnly/>}
            </div>
            <div class="form-group">
                <label for="lastName">Last Name:</label>
                {initiallastName.length<=0?<input type="text" class="form-control" id="lastName" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>:
                <input type="text" class="form-control" id="lastName" placeholder="Enter Last Name" value={lastName} readOnly/>}
            </div>
            <div class="form-group">
                <label for="licenseNumber">License Number:</label>
                {intilallicenseNumber.length<=0?<input type="text" class="form-control" id="licenseNumber" placeholder="Enter License Number (8 characters)" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} required/>
                :<input type="text" class="form-control" id="licenseNumber" placeholder="Enter License Number (8 characters)" value={licenseNumber} readOnly/>}
            </div>
            <div class="form-group">
                <label for="age">Age:</label>
                <input type="number" class="form-control" id="age" placeholder="Enter Age" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
            <div class="form-group">
                <label for="dob">Date of Birth:</label>
                <input type="date" class="form-control" id="dob" value={dob} onChange={(e) => setDOB(e.target.value)} required/>
            </div>
            
            <div class="form-group">
                <label>Car Details:</label>
                <div class="form-row">
                    <div class="col">
                        <input type="text" class="form-control" id="make" placeholder="Make" value={make} onChange={(e) => setMake(e.target.value)} required/>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" id="model" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required/>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" id="year" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required/>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" id="plateNumber" placeholder="Plate Number" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} required/>
                    </div>
                </div>
            </div>

            <div class="form-group">
      <label>Available Time Slots :</label>
      {/* Calendar to pick the date */}
      <br></br>
      <input type="date" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)} style={{ marginBottom: '10px' }} />
        {
            availableSlots.length>0?<>
            <div class="form-group">
        {selectedSlot ==='' || !selectedSlot?
      <>
        <label>Available Slots</label>
        <select onChange={(e) => setSelectedSlot(e.target.value)} class="form-control">
          <option value="">Select a Slot</option>
          {availableSlots.map((slot, index) => (
            <option key={index} value={slot._id}>
              {slot.time}
            </option>
          ))}
        </select>
        </>
        :
        <>
        <label>Update Slots</label>
        <select onChange={(e) => setSelectedSlot(e.target.value)} class="form-control">
          <option value={selectedSlot._id}>{selectedSlot.time}</option>
          {availableSlots.map((slot, index) => (
            <option key={index} value={slot._id}>
              {slot.time}
            </option>
          ))}
        </select>
        </>
        }
        
      </div></>:<>
      <div class="form-group">
      <label>No More Slot Provided by Admin for this Date</label>
      </div>
      </>
        }
      {/* Dropdown to display available slots */}
      
    </div>
            
            <button type="submit" class="btn btn-primary">Submit</button>

        </form>
    </div>
    
    </>
  );
}

export default GTest2;
