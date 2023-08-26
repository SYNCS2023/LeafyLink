import React from 'react';
import Plant from '../components/Plant';

const Garden = () => {
    return (
        // <div className="card bg-base-200 w-80">
        //   <div className="card-body">
        //     <div className="card w-96 bg-base-100 shadow-xl">
        //       <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
        //       <div className="card-body">
        //         <h2 className="card-title">Shoes!</h2>
        //         <p>If a dog chews shoes whose shoes does he choose?</p>
        //         <div className="card-actions justify-end">
        //           <button className="btn btn-primary">Buy Now</button>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center">
            <div className="flex flex-initial p-10 justify-center">
                <Plant name="Lari" type="Cucumber" likes="133" img="/images/lari.png" age={0} owned={true} />
            </div>
            <div className="flex flex-initial p-10 justify-center">
                <Plant name="Ryan" type="Tomato" likes="133" img="/images/ryan.jpeg" age={1} owned={true} />
            </div>
            <div className="flex flex-initial p-10 justify-center">
                <Plant name="Luke" type="Potato" likes="133" img="/images/luke.png" age={2} owned={true} />
            </div>
            {/* <div className="flex flex-initial p-10 justify-center">
                <Plant />
            </div>
            <div className="flex flex-initial p-10 justify-center">
                <Plant />
            </div> */}
        </div>
    )
};

export default Garden;
