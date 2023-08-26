import { Link } from 'react-router-dom';
import Menubar from '../components/Menubar';
import { motion } from 'framer-motion';

const Quiz = () => {
  return (
    <>
      <h1 className='text-5xl font-bold gradient-text'>
        Bring a new life to your garden!
      </h1>
      <div className='flex h-screen items-center justify-center'>
        <div className='flex flex-col items-center space-y-4'>
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
      </div>
      <Menubar active='quiz' />
    </>
  );
};

export default Quiz;
