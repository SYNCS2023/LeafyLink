import React from 'react';
import Plant from '../components/Plant';
import Menubar from '../components/Menubar';
import { useState } from "react";
import defaultPlants from '../assets/defaultPlants.json';

const Home = () => {
  const [plants, setPlants] = useState(
    (localStorage.getItem('plants') != null) ? JSON.parse(localStorage.getItem('plants')) : defaultPlants
  );

  return (
    <div>
      <h1 className='text-5xl font-bold gradient-text pb-2'>Leafy Link</h1>
      <br></br>
      <div className="grid grid-cols-1 gap-4 content-center justify-items-center">
        {plants.map((plant) => (plant.owned == false) ? (
          <div key={plant.id} className="flex flex-initial justify-center">
            <Plant {...plant} home={true} />
          </div>
        ) : null)}
      </div>
      <Menubar active="home" />
    </div>
  );
};

export default Home;
