import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';

const SuggestPlant = () => {
  const [budget, setBudget] = useState(0);
  const [location, setLocation] = useState(null);
  const [property, setProperty] = useState('');
  const [time, setTime] = useState('');
  const [potted, setPotted] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  function successCallback(position) {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
  }

  function errorCallback(error) {
    console.error('Error getting location:', error.message);
  }

  const handleButtonClick = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return (
    <div>
      <BackButton />
      <h1 className='prose'>Suggest a plant for me</h1>
      <p>time: {time}</p>
      <p>property: {property}</p>
      <p>budget: {budget}</p>
      <p>potted: {potted}</p>
      <p>Latitude: {location?.latitude}</p>
      <p>Longitude: {location?.longitude}</p>
      <ul>
        <li>
          <select
            className='select select-bordered w-full max-w-xs'
            onChange={(e) => {
              setProperty(e.target.value);
            }}
          >
            <option disabled selected>
              What kind of property are you living in?
            </option>
            <option value='house'>House</option>
            <option value='apartment'>Apartment/Unit</option>
            <option value='room'>Single Room</option>
            <option value='caravan'>Caravan</option>
          </select>
        </li>
        <li>
          <select
            className='select select-bordered w-full max-w-xs'
            onChange={(e) => {
              setTime(e.target.value);
            }}
          >
            <option disabled selected>
              What is the timeframe to harvest your plant?
            </option>
            <option value='>1'>Less than a month</option>
            <option value='1-3'>1-3 Months</option>
            <option value='3-6'>3-6 Months</option>
            <option value='3-6'>6-12 Months</option>
            <option value='12+'>12 + Months</option>
          </select>
        </li>
        <li>
          <select
            className='select select-bordered w-full max-w-xs'
            onChange={(e) => {
              setBudget(e.target.value);
            }}
          >
            <option disabled selected>
              What is your budget?
            </option>
            <option value='5'>$5</option>
            <option value='10'>$10</option>
            <option value='25'>$25</option>
            <option value='50'>$50</option>
            <option value='100'>$100+</option>
          </select>
        </li>
        <li>
          <div className='form-control'>
            <label className='label cursor-pointer'>
              <span className='label-text'>Potted Plant</span>
              <input
                type='radio'
                name='radio-10'
                className='radio checked:bg-primary'
                checked={potted === 'pot'}
                onChange={() => {
                  setPotted('pot');
                }}
              />
            </label>
          </div>
          <div className='form-control'>
            <label className='label cursor-pointer'>
              <span className='label-text'>Plant in Ground</span>
              <input
                type='radio'
                name='radio-10'
                className='radio checked:bg-primary'
                checked={potted === 'ground'}
                onChange={() => {
                  setPotted('ground');
                }}
              />
            </label>
          </div>
        </li>
        <li>
          <input
            type='text'
            placeholder='Location'
            className='input input-bordered w-full max-w-xs'
          />
        </li>
      </ul>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleButtonClick}
        className={`btn ${
          loading ? 'bg-gray-300 cursor-not-allowed' : 'btn-primary'
        }`}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get My Location'}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className='btn btn-accent hover:shadow-lg'
        onClick={() => window.my_modal_5.showModal()}
      >
        Suggest Plant
      </motion.button>

      <dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
        <form method='dialog' className='modal-box'>
          <h3 className='font-bold text-lg'>The best match for you is</h3>
          <p className='py-4'>Asparagus</p>
          <div className='modal-action'>
            <button className='btn'>Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default SuggestPlant;
