import React from 'react'

const Plant = (props) => {
  return (
    <>
      <div className='card w-96 bg-base-100 shadow-xl p-0'>
        <figure className='h-60'>
          <img
            className='object-cover hover:scale-110 transition duration-500 cursor-pointer'
            src={props.img}
            alt={props.type}
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title mb-0 uppercase text-primary text-2xl'>
            {props.name}!
            {(() => {
              if (props.age == undefined) {
                return <></>
              } else if (props.age <= 0) {
                return <div className='badge badge-secondary'>NEW</div>
              } else {
                return <div className='badge badge-primary'>{props.age === 1 ? '1 DAY OLD' : `${props.age} DAYS OLD`}</div>
              }
            })()}
          </h2>
          <p className='align-left text-left text-justify uppercase text-lg'>
            {props.type}
            <p className='float-right'>{props.likes === 1 ? '1 Like' : `${props.likes || 0} Likes`}</p>
          </p>
          {props.owned &&
            <div className='card-actions justify-end'>
              <label htmlFor='my_modal' className='btn btn-primary'>Troubleshoot</label>
              <input type='checkbox' id='my_modal' className='modal-toggle' />
              <div className='modal'>
                <div className='modal-box max-w-screen-2xl text-left'>
                  {/* <h3 className='text-lg font-bold'>Some recommendations to help with your plant:</h3> */}
                  {/* <p className='py-4'>Skill diff, try harder!</p> */}
<h3 className='text-lg font-bold'>Overwatering</h3>
<p><span className='underline'>What to look for:</span> When a plant has been overwatered, older leaves will be yellow and younger leaves will appear brown instead of bright yellowish green.</p>
<p><span className='underline'>How to fix:</span> Do the touch-test! For many of us, overwatering is all too common. Wait to water until the top of the soil is visibly dry for an inch or two deep. If the dryness test fails, then wait a couple days and check again before watering.</p>
<br></br>

<h3 className='text-lg font-bold'>Underwatering</h3>
<p><span className='underline'>What to look for:</span> While an overwatered plant will appear yellow and droopy, an underwatered plant will appear yellow-brown and dry. Leaves that are noticeably crisp are due to underwatering.</p>
<p><span className='underline'>How to fix:</span> If you struggle to remember when it is time to water, a mobile app like Water Bug can be a big help. Just snap a pic of the plant, and set the watering schedule to receive reminders.</p>
<br></br>

<h3 className='text-lg font-bold'>Not enough sun</h3>
<p><span className='underline'>What to look for:</span> If not enough sun is the culprit, then the leaves will appear wilted and bent, and are likely to fall off the stem easily.</p>
<p><span className='underline'>How to fix:</span> Make sure you’re treating your plant to the type and amount of sunlight it requires. But not getting enough sun can happen accidentally during times of seasonal change. For example, if you’re bringing your houseplants in from outside as the weather turns, be sure to put them all in the most well-lit place in your house and then disburse them after they adjust.</p>
<br></br>

<h3 className='text-lg font-bold'>Too much sun</h3>
<p><span className='underline'>What to look for:</span> Plants that have gotten too much sun exposure will have leaves that start to turn pale, either yellowish-green or whitish-tan dependent on the plant. The may also have scorched spots. These are all signs of too much sun built up over time. If the exposure happens very suddenly, the leaves will simply appear wilted.</p>
<p><span className='underline'>How to fix:</span> If you can, move the plant to another area of the house with no direct sun. But if you have a very well-lit area of your house that you are attempting to transition plants to, then solve the issue of too much sun with extra water. You might find that with extra watering, you’re able to get the plant accustomed to the higher amount of light.</p>
<br></br>

<h3 className='text-lg font-bold'>Pests</h3>
<p><span className='underline'>What to look for:</span> Spider mites, fungal gnats and other tiny pests can wreak havoc on your treasured plants. Yellow blotches, white veins, silvery or bronze streaks… all of these forms of damage can signal common houseplant pests.</p>
<p><span className='underline'>How to fix:</span> Neem oil is a natural, non-toxic pesticide that is easy to find in spray form. Mist a light coating on the tops and undersides of plant leaves as well as the stems and allow to air dry. As a preventative measure once the pests are gone, you can mix up an at-home solution of 1:1 rubbing alcohol and water in a medium to large spray bottle. Then add in one teaspoon of natural dish soap to the mixture. Once a month, spritz plants with the solution and then lightly rinse with water. </p>
<br></br>

<h3 className='text-lg font-bold'>Root rot</h3>
<p><span className='underline'>What to look for:</span> Root rot is a more extreme form of water damage. The plant has been overwatered for so long that the roots die back and decay because of a lack of oxygen. If it’s not just a few yellowing leaves, but a plant that is full of yellowing leaves, root rot might be the culprit. Remove the plant from the pot, and if the roots are very dark and soggy instead of firm, then you’ll know for sure.</p>
<p><span className='underline'>How to fix:</span> Remove the plant from the pot, rinse away the soil, and trim all of the unhealthy-looking roots. Then you can transplant the soil into a new pot, and include a wick or synthetic string that you allow to hang out of the drainage hole to help promote excellent drainage. And of course, water less.</p>
                </div>
                <label className='modal-backdrop' htmlFor='my_modal'>Close</label>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Plant