import React from 'react';
import Plant from '../components/Plant';
import Menubar from '../components/Menubar';
import { useState } from 'react';
import defaultPlants from '../assets/defaultPlants.json';
import { config } from '../logic/constants';

const Home = () => {
  const [plants, setPlants] = useState(
    localStorage.getItem('plants') != null
      ? JSON.parse(localStorage.getItem('plants'))
      : defaultPlants
  );

  return (
    <div>
      <div className='flex justify-center items-center p-4'>
        <img
          className='h-12'
          src={config.base + '/images/leafylinkbrand.png'}
          alt='Logo'
        />
      </div>
      <br></br>
      <div className='grid grid-cols-1 gap-4 content-center justify-items-center'>
        {plants.map((plant) =>
          plant.owned == false ? (
            <div key={plant.id} className='flex flex-initial justify-center'>
              <Plant {...plant} home={true} />
            </div>
          ) : null
        )}
        <div className='flex flex-initial justify-center'>
          Made with ♥ by Luke, Wanning, Larissa, Ryan, and Haowen
        </div>
      </div>
      <Menubar active='home' />
    </div>
  );
};

export default Home;
