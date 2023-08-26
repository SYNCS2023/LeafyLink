import React from 'react';
import Plant from '../components/Plant';

const Garden = () => {
    return (
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
            <div className="flex flex-initial p-10 justify-center">
                <Plant name="Wanning" type="Artichoke" likes="113" img="/images/wanning.jpg" age={3} owned={true} />
            </div>
            <div className="flex flex-initial p-10 justify-center">
                <Plant name="Haowen" type="Mandarin" likes="113" img="/images/haowen.webp" age={4} owned={true} />
            </div>
        </div>
    )
};

export default Garden;
