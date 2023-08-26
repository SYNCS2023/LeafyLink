import React from 'react';
import Plant from '../components/Plant';
import Menubar from '../components/Menubar';
import { useState } from "react";
import defaultPlants from '../assets/defaultPlants.json';

const Home = () => {
  const [plants, setPlants] = useState(
    (localStorage.getItem('plants') != null) ? JSON.parse(localStorage.getItem('plants')) : defaultPlants
  );

  return <div>
    <h1 className='font-bold text-3xl'>Urban Gardening</h1>
    <br></br>
    <div className="grid grid-cols-1 gap-4 content-center justify-items-center">
      {plants.map((plant) => (
        <div className="flex flex-initial justify-center">
          <Plant name={plant.name} type={plant.type} img={plant.img} likes={plant.likes} />
        </div>
      ))}
    </div>
    <Menubar active="home" />
  </div>;
};

export default Home;
