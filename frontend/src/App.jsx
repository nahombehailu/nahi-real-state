import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import Profiles from './pages/Profiles'
import SignUp from './pages/SignUp'
import Header from './componets/Header'
import PrivateRoute from './componets/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'

export default function App() {
  return (
    <BrowserRouter>
    <Header />
<Routes>
  <Route path='/' element={<Home />} />
  <Route path='/about' element={<About />} />
  <Route path='/listing/:listingId' element={<Listing />} />
  <Route path='/signin' element={<SignIn />} />
  <Route path='/signup' element={<SignUp />} />
  <Route path='/search' element={<Search />} />
  <Route element={<PrivateRoute />}>
       <Route path='/profiles' element={<Profiles  />} />
       <Route path='/profiles/create-listing' element={<CreateListing  />} />
       <Route path='/profiles/update-listing/:listingId' element={<UpdateListing  />} />
      
  </Route>
</Routes>

    </BrowserRouter>
  )
}
