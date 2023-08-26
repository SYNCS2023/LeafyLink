import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SuggestCard = ({ name, imageUrl }) => {
  return (
    <div>
      <p className='py-4'>{name}</p>
      <img
        className='object-cover hover:scale-110 transition duration-500 cursor-pointer py-5'
        src={imageUrl}
        alt={imageUrl}
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
    </div>
  );
};

export default SuggestCard;
