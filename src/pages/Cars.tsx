import React, { useState } from 'react';
import { Search, Filter, X, Car, Fuel, Gauge, Calendar } from 'lucide-react';

const Cars = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const cars = [
    {
      id: 1,
      name: "Mercedes-Benz S-Class",
      brand: "Mercedes-Benz",
      type: "Sedan",
      price: 94250,
      year: 2024,
      mpg: "23/31",
      engine: "3.0L V6 Turbo",
      horsepower: 429,
      transmission: "9-Speed Automatic",
      drivetrain: "AWD",
      features: ["Premium Sound System", "Adaptive Cruise Control", "Leather Seats", "Sunroof"],
      image: "https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "The epitome of luxury and performance, featuring cutting-edge technology and unparalleled comfort."
    },
    {
      id: 2,
      name: "BMW X5",
      brand: "BMW",
      type: "SUV",
      price: 62200,
      year: 2024,
      mpg: "21/26",
      engine: "3.0L I6 Turbo",
      horsepower: 335,
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      features: ["iDrive System", "Panoramic Roof", "Heated Seats", "Wireless Charging"],
      image: "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "A perfect blend of luxury and versatility, ideal for both city driving and adventure."
    },
    {
      id: 3,
      name: "Audi A8",
      brand: "Audi",
      type: "Sedan",
      price: 86500,
      year: 2024,
      mpg: "22/31",
      engine: "3.0L V6 Turbo",
      horsepower: 335,
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      features: ["Virtual Cockpit", "Matrix LED Headlights", "Massage Seats", "Bang & Olufsen Sound"],
      image: "https://images.pexels.com/photos/1719649/pexels-photo-1719649.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Sophisticated engineering meets elegant design in this flagship luxury sedan."
    },
    {
      id: 4,
      name: "Porsche 911",
      brand: "Porsche",
      type: "Sports Car",
      price: 106100,
      year: 2024,
      mpg: "20/28",
      engine: "3.0L Flat-6 Twin-Turbo",
      horsepower: 379,
      transmission: "8-Speed PDK",
      drivetrain: "RWD",
      features: ["Sport Chrono Package", "Premium Audio", "Sport Seats", "Adaptive Suspension"],
      image: "https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "The iconic sports car that defines performance and handling excellence."
    },
    {
      id: 5,
      name: "Range Rover Sport",
      brand: "Land Rover",
      type: "SUV",
      price: 83500,
      year: 2024,
      mpg: "19/25",
      engine: "3.0L I6 Turbo",
      horsepower: 395,
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      features: ["Terrain Response", "Air Suspension", "Meridian Sound", "Panoramic Roof"],
      image: "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Uncompromising luxury meets exceptional off-road capability."
    },
    {
      id: 6,
      name: "Tesla Model S",
      brand: "Tesla",
      type: "Sedan",
      price: 89440,
      year: 2024,
      mpg: "120 MPGe",
      engine: "Dual Motor Electric",
      horsepower: 670,
      transmission: "Single-Speed",
      drivetrain: "AWD",
      features: ["Autopilot", "17-inch Touchscreen", "Premium Audio", "Glass Roof"],
      image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Revolutionary electric performance with cutting-edge technology and sustainability."
    }
  ];

  const brands = [...new Set(cars.map(car => car.brand))];
  const types = [...new Set(cars.map(car => car.type))];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === '' || car.brand === selectedBrand;
    const matchesType = selectedType === '' || car.type === selectedType;
    const matchesPrice = priceRange === '' || 
                        (priceRange === 'under-50k' && car.price < 50000) ||
                        (priceRange === '50k-75k' && car.price >= 50000 && car.price < 75000) ||
                        (priceRange === '75k-100k' && car.price >= 75000 && car.price < 100000) ||
                        (priceRange === 'over-100k' && car.price >= 100000);
    
    return matchesSearch && matchesBrand && matchesType && matchesPrice;
  });

  const openModal = (car) => {
    setSelectedCar(car);
  };

  const closeModal = () => {
    setSelectedCar(null);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Premium Collection</h1>
          <p className="text-xl text-gray-300">Discover your perfect vehicle from our curated selection</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Prices</option>
              <option value="under-50k">Under $50,000</option>
              <option value="50k-75k">$50,000 - $75,000</option>
              <option value="75k-100k">$75,000 - $100,000</option>
              <option value="over-100k">Over $100,000</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedBrand('');
                setSelectedType('');
                setPriceRange('');
              }}
              className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <Filter className="h-5 w-5" />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-gray-600">{filteredCars.length} vehicles found</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => openModal(car)}
              >
                <div className="relative">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {car.year}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{car.name}</h3>
                  <p className="text-gray-600 mb-4">{car.brand} • {car.type}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Fuel className="h-4 w-4" />
                      <span>{car.mpg} MPG</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Gauge className="h-4 w-4" />
                      <span>{car.horsepower} HP</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-red-600">
                      ${car.price.toLocaleString()}
                    </div>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors duration-300"
              >
                <X className="h-6 w-6" />
              </button>
              <img
                src={selectedCar.image}
                alt={selectedCar.name}
                className="w-full h-64 md:h-80 object-cover rounded-t-xl"
              />
            </div>
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedCar.name}</h2>
                  <p className="text-xl text-gray-600">{selectedCar.brand} • {selectedCar.type}</p>
                </div>
                <div className="text-3xl font-bold text-red-600">
                  ${selectedCar.price.toLocaleString()}
                </div>
              </div>
              
              <p className="text-gray-700 mb-8 text-lg">{selectedCar.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Engine:</span>
                      <span className="font-medium">{selectedCar.engine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Horsepower:</span>
                      <span className="font-medium">{selectedCar.horsepower} HP</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transmission:</span>
                      <span className="font-medium">{selectedCar.transmission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Drivetrain:</span>
                      <span className="font-medium">{selectedCar.drivetrain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fuel Economy:</span>
                      <span className="font-medium">{selectedCar.mpg} MPG</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                  <ul className="space-y-2">
                    {selectedCar.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300 font-semibold">
                  Schedule Test Drive
                </button>
                <button className="flex-1 border-2 border-red-600 text-red-600 py-3 px-6 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-300 font-semibold">
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;