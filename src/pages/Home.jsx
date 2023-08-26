import React from 'react';
import Plant from '../components/Plant';
import Menubar from '../components/Menubar';

const Home = () => {
  return <div>
    <h1 className='text-lg'>Urban Gardening</h1>
    <div className="grid grid-cols-1 gap-4 content-center justify-items-center">
      <div className="flex flex-initial justify-center">
        <Plant name="Ryan" type="Cherry Tomato" img="/images/ryan.jpeg" />
      </div>
      <div className="flex flex-initial justify-center">
        <Plant name="Luke" type="Potato" img="/images/luke.png" />
      </div>
      <div className="flex flex-initial justify-center">
        <Plant name="OzHarvest" type="OzHarvest" img="https://scontent.fcbr1-1.fna.fbcdn.net/v/t39.30808-6/347246174_220047104191485_3532220201324838855_n.png?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=pLpSfU0PMokAX-dhcNF&_nc_ht=scontent.fcbr1-1.fna&oh=00_AfDvSAFhGri9XoSpOvSXz6FqBulCsxJcboXSczgZ9RIogw&oe=64EDD610" />
      </div>
      <div className="flex flex-initial justify-center">
        <Plant name="Lari" type="Cucumber" img="/images/lari.png" />
      </div>
      <div className="flex flex-initial justify-center">
        <Plant name="Ryan" type="Cherry Tomato" img="/images/ryan.jpeg" />
      </div>
      <div className="flex flex-initial justify-center">
        <Plant name="Ryan" type="Cherry Tomato" img="/images/ryan.jpeg" />
      </div>
      <div className="flex flex-initial justify-center">
        <Plant name="Ryan" type="Cherry Tomato" img="/images/ryan.jpeg" />
      </div>
      <div className="flex flex-initial justify-center">
        <Plant name="Ryan" type="Cherry Tomato" img="/images/ryan.jpeg" />
      </div>
    </div>
    <Menubar active="home" />
  </div>;
};

export default Home;
