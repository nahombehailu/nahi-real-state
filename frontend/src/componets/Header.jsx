import {FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'


export default function Header() {
  const {currentUser}=useSelector((state)=>state.persistedReducer.user)

  return (
    <header className='bg-slate-500' >
      <div className='flex  justify-between items-center mx-10'>
        {/* logo */}
     <div className='text-lg sm:tet-6xl p-3'> 
     <Link to='/'>
<span className='bg-slate-200'>nahom</span>
<span className='bg-slate-300'>realState</span>
</Link>
     </div>
     {/* serach */}
     <form className='flex p-3 items-center justify-between bg-slate-100 '>
        <input type="serach" placeholder='Search here...' className='focus:outline-none hidden sm:inline w-34 sm:w-64' />
        <FaSearch />
     </form>
    {/* about and signin */}
    <ul className='flex gap-2 '>
        <Link to='/' className='hidden sm:inline hover:underline'>Home</Link>
        <Link to='/about'className='hidden sm:inline hover:underline'>About</Link>
        <Link to='/profiles'>
          {currentUser ? (
          <div>
             <img src={currentUser.avatar} alt='profile' className='h-7 w-7 rounded-full object-cover'/>
          </div>)
          :
          (
            <div>
          signin
          </div>
        )
          }
        
        </Link>
    </ul>



      </div>
    </header>
  )
}
