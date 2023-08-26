import React from 'react';

const Post = (props) => {
  return (
    <div>
        <div className="card card-compact w-96 bg-base-100 shadow-xl p-0">
        <figure className="h-60">
            <img className="object-cover hover:scale-110 transition duration-500 cursor-pointer" src={ props.image } alt={ props.type } />
        </figure>
        <div className="card-body">
            <h2 className="card-title uppercase text-primary text-2xl mb-0">{ props.name }</h2>
            <p className='text-justify uppercase text-lg'>{ props.type }</p>
        </div>
        </div>
    </div>
  );
};

export default Post;