import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { config } from '../logic/constants';
import { useState } from "react";

const SuggestCard = ({ name, imageUrl }) => {
  const [plants, setPlants] = useState(JSON.parse(localStorage.getItem('plants')));

  const createPlant = async () => {
    var newPlants = plants;
    let nextId = Math.max.apply(Math, plants.map(function(o) { return o.id; })) + 1;
    let addedPlant = {
      "id": nextId,
      "img": imageUrl,
      "type": name,
      "age": 0, 
      "likes": 0,
      "owned": true,
      "name": name,
      "user": "self",
      "description": "self"
    };
    newPlants.push(addedPlant);
    setPlants(newPlants);
    localStorage.setItem('plants', JSON.stringify(newPlants));

    window.location.href = config.base + "/#/garden";
  };

  return (
    <div className='mx-1'>
      <p className='py-4'>{name}</p>
      <div className='relative w-32 h-32 overflow-hidden'>
        <img
          className='aspect-w-1 aspect-h-1 object-cover hover:scale-110 transition duration-500 cursor-pointer py-5'
          src={config.base + imageUrl}
          alt={imageUrl}
        />
      </div>
      <Link to='/garden' onClick={() => createPlant()}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className='btn btn-accent hover:shadow-lg'
        >
          Add to garden
        </motion.button>
      </Link>
    </div>
  );
};

export default SuggestCard;
