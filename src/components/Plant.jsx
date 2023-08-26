import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { config } from '../logic/constants';
import ModalPlain from "./ModalPlain";
import ModalQuery from "./ModalQuery";

const Plant = (props) => {
  const [plants, setPlants] = useState(JSON.parse(localStorage.getItem('plants')));
  const [likes, setLikes] = useState(props.likes);

  

  const [animate, setAnimate] = useState(false);

  const handleAnimate = () => {
    setAnimate(true);
    updatePlant();
    setTimeout(() => {
      setAnimate(false);
    }, 500); // Reset bounce after 1 second
  };

  const updatePlant = () => {
    let plant = plants.find((p) => p.id === props.id);
    plant.likes += 1;
    setLikes(likes + 1);
    const newPlants = plants.map((p) => {
      if (p.id === plant.id) {
        return plant;
      } else {
        return p;
      }
    });
    setPlants(newPlants);
    localStorage.setItem('plants', JSON.stringify(newPlants));
  };

  return (
    <>
      <div className='card w-96 bg-base-100 shadow-xl p-0'>
        <figure className='h-60'>
          <img
            className='object-cover hover:scale-110 transition duration-500 cursor-pointer'
            src={props.img.startsWith('data:image') ? props.img : config.base + props.img}
            alt={props.type}
          />
          {(() => {
            if (props.home === undefined) {
              if (props.age === undefined) {
                return <></>
              } else if (props.age <= 0) {
                return <div className='badge badge-secondary absolute right-3 top-3 h-fit'>NEW</div>
              } else {
                return <div className='badge badge-primary absolute right-3 top-3 h-fit'>{props.age === 1 ? '1 DAY OLD' : `${props.age} DAYS OLD`}</div>
              }
            } else if (props.home === true) {
              return <div className='badge badge-primary absolute right-3 top-3 h-fit'>{props.user}</div>
            } else {
              return <></>
            }
            })()}
        </figure>
        <div className='card-body'>
        <div className='flex items-center justify-between'>
          <h2 className='card-title mb-0 text-primary text-2xl'>
            {props.name} 
          </h2>
          <div className='float-right'>
            {(() => {
              if (props.home == true) {
                return (
                  <>
                    {likes || 0}&nbsp;
                    <button onClick={() => (handleAnimate())}>
                      <FontAwesomeIcon icon={faDroplet} style={{color: 'primary'}} className={animate ? 'animate-bounce' : ''} />
                    </button>
                  </>
                )
              }
            })()}
          </div>
        </div>
          <div className='align-left text-left text-lg'>
            {(props.home == true) ? props.description : props.type} 
          </div>
          {props.owned &&
            <div className='flex content-between'>
              <div className='card-actions justify-start mr-2'>
                <label htmlFor='diary_modal' className='btn btn-primary'>Diary</label>
                <input type='checkbox' id='diary_modal' className='modal-toggle' />
                <div className='modal'>
                  <div className='modal-box max-w-screen-2xl'>
                    DIARY
                  </div>
                  <label className='modal-backdrop' htmlFor='diary_modal'>Close</label>
                </div>
              </div>
              <div className='card-actions justify-end'>
                {props.type === "Tomato" ? <ModalQuery /> : <ModalPlain />}
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Plant