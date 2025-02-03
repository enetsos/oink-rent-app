import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { ModeToggle } from './mode-toggle'

export const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/3800/3800591.png" alt="Logo" className="h-8 w-8 mr-2" />
            <Link to="/" className="text-xl font-bold text-gray-800">OinkRent</Link>
          </div>
          <div className="flex items-center space-x-4">
            {!token ? (
              <>
                <Link to="/login" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link to="/signup" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Signup</Link>
              </>
            ) : (
              <button onClick={logout} className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}