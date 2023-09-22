import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homepage from './Pages/Homepage';
import Loginpage from './Pages/Loginpage';
import DoctoerPage from './Pages/Loginpage';
import Registerpage from './Pages/Registerpage';
import {useSelector} from 'react-redux'
import Spinner from './components/Spinner';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import ApplyDoctor from './Pages/ApplyDoctor';
import NotificationPage from './Pages/NotificationPage';
import Users from './Pages/admin/Users';
import Doctors from './Pages/admin/Doctors';
import Profile from './Pages/doctor/Profile';
import Appoitments from './Pages/Appoitments';
import { DoctorAppointments } from './Pages/doctor/DoctorAppointments';
import { BookingPage } from './Pages/BookingPage';



function App() {
  const { loading} = useSelector(state => state.alerts)
  return (
    <>
    <BrowserRouter>
    { loading ? (
      <Spinner />
    ) : (
    <Routes>

      <Route 
      path='/apply-doctor' 
      element={
        <ProtectedRoute>
      <ApplyDoctor />
      </ProtectedRoute>
    } 
    /> 


<Route 
      path='/admin/users' 
      element={
        <ProtectedRoute>
      <Users />
      </ProtectedRoute>
    } 
    />

<Route 
      path='/admin/doctors' 
      element={
        <ProtectedRoute>
      <Doctors />
      </ProtectedRoute>
    } 
    />


<Route 
      path='/doctor/profile/:id' 
      element={
        <ProtectedRoute>
      <Profile />
      </ProtectedRoute>
    } 
    />

<Route 
      path='/doctor/book-appointment/:doctorId' 
      element={
        <ProtectedRoute>
      <BookingPage />
      </ProtectedRoute>
    } 
    />




<Route 
      path='/notification' 
      element={
        <ProtectedRoute>
      <NotificationPage/>
      </ProtectedRoute>
    } 
    /> 


      <Route path='/login' 
      element={
       <PublicRoute>
      <Loginpage />
      </PublicRoute>
      }
      />
      <Route path='/register' 
      element={
        <PublicRoute>
      <Registerpage />
      </PublicRoute>
      }
      />

<Route path='/docter' 
      element={
        <PublicRoute>
      <DoctoerPage />
      </PublicRoute>
      }
      />

      <Route path='/appoitments' 
      element={
        <ProtectedRoute>
      <Appoitments />
      </ProtectedRoute>
      }
      />


      <Route path='/doctor-appointments' 
      element={
      <ProtectedRoute>
      <DoctorAppointments />
      </ProtectedRoute>
      }
      />


      <Route 
      path='/' 
      element={
        <ProtectedRoute>
      <Homepage />
      </ProtectedRoute>
    } 
    />


    </Routes>
    )}
    </BrowserRouter>
    </>
  );
}

export default App;
