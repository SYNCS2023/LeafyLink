import { Link } from 'react-router-dom';
const Quiz = () => {
  return (
    <div>
      <Link to='/new'>
        <button className='btn btn-primary'>HELP ME DECIDE WHAT TO GROW</button>
      </Link>
      <Link to='/existing'>
        <button className='btn btn-primary'>I ALREADY HAVE A PLANT</button>
      </Link>
    </div>
  );
};

export default Quiz;
