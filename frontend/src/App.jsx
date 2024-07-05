import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import Profiles from './pages/Profiles'
import SignUp from './pages/SignUp'
import Header from './componets/Header'

export default function App() {
  return (
    <BrowserRouter>
    <Header />
<Routes>
  <Route path='/' element={<Home />} />
  <Route path='/about' element={<About />} />
  <Route path='/signin' element={<SignIn />} />
  <Route path='/signup' element={<SignUp />} />
  <Route path='/profiles' element={<Profiles  />} />
</Routes>

    </BrowserRouter>
  )
}
