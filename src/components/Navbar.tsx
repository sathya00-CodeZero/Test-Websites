import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Car } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/cars', label: 'Cars' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleEmailSubmit = () => {
    if (!email) return alert('Please enter an email');

    const userDetails = { uniqueId: email };

    if (window.ReWebSDK && typeof window.ReWebSDK.userRegister === 'function') {
      // Call the SDK
      window.ReWebSDK.userRegister(userDetails);

      // Polling to check if user is registered successfully
      // This assumes the SDK sets success response internally
      const checkSuccess = setInterval(() => {
        // Here you can check SDK status or assume success
        // For demo, we assume registration is instant and successful
        localStorage.setItem('userEmail', email);
        setUserEmail(email);
        setIsModalOpen(false);
        setEmail('');
        clearInterval(checkSuccess);
      }, 500);
    } else {
      console.error('ReWebSDK not available');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('userEmail');
    setUserEmail('');
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Car className={`h-8 w-8 ${isScrolled ? 'text-red-600' : 'text-white'}`} />
            <span className={`text-xl font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>AutoElite</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors duration-200 hover:text-red-600 ${
                  location.pathname === item.path
                    ? 'text-red-600'
                    : isScrolled
                    ? 'text-gray-700'
                    : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {userEmail ? (
              <div className="flex items-center space-x-4">
                <span className={`font-medium ${isScrolled ? 'text-gray-700' : 'text-white'}`}>{userEmail}</span>
                <button
                  onClick={handleSignOut}
                  className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    isScrolled ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white text-red-600 hover:bg-gray-100'
                  }`}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className={`ml-4 px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  isScrolled ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white text-red-600 hover:bg-gray-100'
                }`}
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {userEmail ? (
              <div className="flex items-center space-x-2">
                <span className={`font-medium ${isScrolled ? 'text-gray-700' : 'text-white'}`}>{userEmail}</span>
                <button
                  onClick={handleSignOut}
                  className={`px-3 py-2 rounded-md font-medium ${isScrolled ? 'text-gray-700' : 'text-white'}`}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className={`px-3 py-2 rounded-md font-medium ${isScrolled ? 'text-gray-700' : 'text-white'}`}
              >
                Sign In
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:text-red-600 hover:bg-gray-50 ${
                  location.pathname === item.path ? 'text-red-600 bg-gray-50' : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4">Sign In</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleEmailSubmit}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;