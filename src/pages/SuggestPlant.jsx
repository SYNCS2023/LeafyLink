import { motion } from 'framer-motion';
import { useState } from 'react';
import BackButton from '../components/BackButton';
import { Link } from 'react-router-dom';
import suggestPlants from '../logic/suggest';
import plantData from '../logic/plantData.json';

const SuggestPlant = () => {
  const [budget, setBudget] = useState(0);
  const [location, setLocation] = useState(null);
  const [property, setProperty] = useState('');
  const [time, setTime] = useState('');
  const [potted, setPotted] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion1, setSuggestion1] = useState('');
  const [suggestion2, setSuggestion2] = useState('');
  const [suggestion3, setSuggestion3] = useState('');

  const doSuggestPlants = () => {
    console.log('doSuggestPlants');
    console.log({ budget, location, property, time, potted });
    console.log(suggestPlants({ budget, location, property, time, potted }));
    window.my_modal_5.showModal();
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  function successCallback(position) {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
  }

  function errorCallback(error) {
    console.error('Error getting location:', error.message);
  }

  const handleButtonClick = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    getLocation();
  };

  return (
    <div>
      <BackButton />
      <h1 className='font-bold text-3xl py-2 gradient-text'>
        What are your gardening preferences?
      </h1>
      <ul>
        <li>
          <select
            className='select select-bordered w-full max-w-xs my-2'
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
            className='select select-bordered w-full max-w-xs my-2'
            onChange={(e) => {
              setTime(e.target.value);
            }}
          >
            <option disabled selected>
              Duration of gardening experience?
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
            className='select select-bordered w-full max-w-xs my-2'
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
        <li className='flex flex-col justify-center items-center'>
          <div className='form-control w-full max-w-xs'>
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
          <div className='form-control w-full max-w-xs'>
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
            placeholder='Enter Location'
            value={
              location ? `${location.latitude}, ${location.longitude}` : ''
            }
            className='input input-bordered w-full max-w-xs my-2'
          />
        </li>
        <li className='flex justify-center'>
          <div className='divider w-full max-w-xs'>OR</div>
        </li>
        <li>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleButtonClick}
            className={`btn ${
              loading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'btn-primary btn-outline'
            }`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get My Location'}
          </motion.button>
        </li>
      </ul>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className='btn btn-lg btn-accent hover:shadow-lg my-4'
        onClick={() => {
          doSuggestPlants();
        }}
      >
        Suggest Plant
      </motion.button>

      <dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
        <form method='dialog' className='modal-box'>
          <h3 className='font-bold text-lg'>The best match for you is</h3>
          <p className='py-4'>Cucumber</p>
          <img
            className='object-cover hover:scale-110 transition duration-500 cursor-pointer py-5'
            src='public/images/lari.png'
            alt='public/images/lari.png'
          />
          <Link to='/garden'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className='btn btn-accent hover:shadow-lg'
            >
              Add to my garden
            </motion.button>
          </Link>
        </form>
      </dialog>
    </div>
  );
};

export default SuggestPlant;
