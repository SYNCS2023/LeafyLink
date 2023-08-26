import React from 'react';
import Plant from '../components/Plant';
import Menubar from '../components/Menubar';
import { useState } from 'react';

const Garden = () => {
  const [plants, setPlants] = useState(JSON.parse(localStorage.getItem('plants')));

  return (
    <div className='min-h-screen'>
      <h1 className='text-5xl font-bold gradient-text'>Your Garden</h1>
      <br></br>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
        {plants.map(props => (props.owned == true) ?
            <div key={props.id} className="flex flex-initial justify-center">
              <Plant {...props}/>
            </div>
            : null
        )}
      </div>
      <Menubar active="garden" />
    </div>
  )
};

export default Garden;
