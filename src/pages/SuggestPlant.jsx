import { motion } from 'framer-motion';
import { useState } from 'react';

const SuggestPlant = () => {
  const [budget, setBudget] = useState(0);
  const [location, setLocation] = useState([]);
  const [property, setProperty] = useState('');
  const [time, setTime] = useState('');
  const [potted, setPotted] = useState('');

  return (
    <div>
      <h1 className='prose'>Suggest a plant for me</h1>
      <p>time: {time}</p>
      <p>property: {property}</p>
      <p>budget: {budget}</p>
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
                className='radio checked:bg-red-500'
                checked
              />
            </label>
          </div>
          <div className='form-control'>
            <label className='label cursor-pointer'>
              <span className='label-text'>Plant in Ground</span>
              <input
                type='radio'
                name='radio-10'
                className='radio checked:bg-blue-500'
                checked
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
        className='btn btn-accent hover:shadow-lg'
      >
        Suggest Plant
      </motion.button>
    </div>
  );
};

export default SuggestPlant;
