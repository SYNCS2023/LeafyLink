import { motion } from 'framer-motion';

const SuggestPlant = () => {
  return (
    <div>
      <h1>Suggest a plant for me</h1>
      <ul>
        <li>
          <select className='select select-bordered w-full max-w-xs'>
            <option disabled selected>
              What kind of property are you living in?
            </option>
            <option>House</option>
            <option>Apartment/Unit</option>
            <option>Single Room</option>
            <option>Caravan</option>
          </select>
        </li>
        <li>
          <select className='select select-bordered w-full max-w-xs'>
            <option disabled selected>
              What is the timeframe to harvest your plant?
            </option>
            <option>Less than a month</option>
            <option>1-3 Months</option>
            <option>3-6 Months</option>
            <option>6-12 Months</option>
            <option>12 + Months</option>
          </select>
        </li>
        <li>
          <select className='select select-bordered w-full max-w-xs'>
            <option disabled selected>
              What is your budget?
            </option>
            <option>$10</option>
            <option>1-3 Mont</option>
            <option>3-6 Months</option>
            <option>6-12 Months</option>
            <option>12 + Months</option>
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
