import { Link } from 'react-router-dom';
import Menubar from '../components/Menubar';
import { motion } from 'framer-motion';

const Quiz = () => {
  return (
    <div className='h-screen'>
      <h1 className='text-5xl font-bold gradient-text pb-2'>
        Bring a new life to your garden!
      </h1>
      <div className='flex h-full flex-col items-center align-middle justify-center space-y-5'>
        <Link to='/new'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className='btn btn-lg btn-primary'
          >
            HELP ME DECIDE WHAT TO GROW
          </motion.button>
        </Link>
        <Link to='/existing'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className='btn btn-lg btn-secondary'
          >
            I ALREADY HAVE A PLANT
          </motion.button>
        </Link>
      </div>
      <Menubar active='quiz' />
    </div>
  );
};

export default Quiz;
