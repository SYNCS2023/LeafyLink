import React from 'react'

const Plant = (props) => {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl p-0">
        <figure className="h-60">
          <img
            className="object-cover hover:scale-110 transition duration-500 cursor-pointer"
            src={props.img}
            alt={props.type}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title mb-0">
            {props.name}!
            {props.todo ? <div className="badge badge-secondary">NEW</div> : <></>}
          </h2>
          <p className='align-left text-left'>
            {props.type}
            <p className='float-right'>{props.likes || 0} Likes</p>
          </p>
          {props.owned ? 
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Troubleshoot</button>
            </div>
            : <></>
          }
        </div>
      </div>
    </>
  )
}

export default Plant