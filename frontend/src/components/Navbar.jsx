import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const homePath = user ? '/CategoryDashboard' : '/';

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm px-6 py-3 flex justify-between items-center">
      <Link to={homePath} className="text-xl font-extrabold text-gray-900 tracking-tight">
        Workshop Booking
      </Link>

      <div className="flex items-center space-x-6">
        {user ? (
          <>
            <Link to="/CategoryDashboard" className="text-sm font-bold text-blue-600 hover:underline">
              Dashboard
            </Link>
            <span className="text-sm text-gray-400">|</span>
            <button
              onClick={handleLogout}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;