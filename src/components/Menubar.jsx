import React from 'react';
import { config } from '../logic/constants';

const Menubar = (props) => {
  return (
    <>
      <br></br>
      <br></br>
      <div className='btm-nav'>
        <button
          className={props.active === 'quiz' ? 'active' : ''}
          onClick={() => {
            window.location.href = config.base + '/#/quiz';
          }}
        >
          <span className='text-2xl'>🤔</span>
          <span className='btm-nav-label'>Quiz</span>
        </button>
        <button
          className={props.active === 'home' ? 'active' : ''}
          onClick={() => {
            window.location.href = config.base + '/#/';
          }}
        >
          <span className='text-2xl'>🏡</span>
          <span className='btm-nav-label'>Home</span>
        </button>
        <button
          className={props.active === 'garden' ? 'active' : ''}
          onClick={() => {
            window.location.href = config.base + '/#/garden';
          }}
        >
          <span className='text-2xl'>🌻</span>
          <span className='btm-nav-label'>Garden</span>
        </button>
      </div>
    </>
  );
};

export default Menubar;
