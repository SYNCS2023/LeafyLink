![coverphoto](https://github.com/SYNCS2023/LeafyLink/assets/81507755/ed427383-39d9-45bc-8b6c-65b07482ccbf)

## Inspiration

Do you know the journey fresh produce takes from seed to your fridge?
We’re all aware of food waste -  It contributes to up to 10% of global greenhouse gasses - United Nations Environment Program (UNEP) (2021). Food Waste Index Report. We know grocery stores contribute to food waste by encouraging consumers to buy more than they need, overstocking shelves, inaccurately predicting shelf life or damaging products and restaurants also waste food by mismanaging inventory, poor menu choices or oversized portions. Despite this a majority of food waste in Australia comes from our homes (2.5 million tonnes) - The Food and Agribusiness Growth Centre (2021). National Food Waste Strategy Feasibility Study

### Do you know the journey fresh produce takes from seed to the fridge?

Our team also had this question and want to target food waste at a household level through reconnecting consumers with the produce they’re eating. Our goal is to educate and raise awareness of the processes by which fruits and vegetables are grown. We seek to instil a deeper and empathetic connection with fresh produce. Interactions on LeafyLink encourage conscious consumer choices to reduce food waste and ultimately improve an individual’s contribution to a greener planet.

Many of our parents are enthusiastic about gardening, and they enjoy it because it is cost efficient and sustainable? So, we want to promote a good habit of gardening for everyone to enjoy similar benefits.

## What it does
LeafyLink is an app that connects users back to the roots (literally) of what they’re consuming. We want to ignite a feeling of curiosity across the community with a social application for monitoring and learning about growing your own produce from seed to harvest. It is the perfect platform for novices in metropolitan areas to give gardening a shot, because it has handy digital tools that make gardening very accessible. The app allows you to name your plant and appreciate other people's plants by sending a 💧, which is a fun incentive for users. Regardless of how big your place is, we have a gardening solution for you. We want to foster a community of green thumbs who are aware of how fresh produce is grown and are responsible consumers. 

Our app features:
* 🔢 Recommendation Algorithm - We take in your living conditions and lifestyle preferences and recommend you what to grow. 
* 🌱Digital Garden Diary - Become acquainted with your plants, track how they grow through a daily diary and smart notification system. We help you catalog all your plants so you can have peace of mind. 
* ❔ Plant Troubleshooting - Our image recognition system detect potential illnesses early on and recommend research based treatment and harvesting solutions. 
* 👪 Encouraging Community - Socially connect with growers by watering other user’s plants near you. Discover what plant might be your next best friend! 

## How we built it
We built this application with a React frontend. Our plant recommendation algorithm takes in information including budget, location and living space while also considering how much experience the user has with gardening to match against our extensive list of plants. From inputted data, we infer information about seasonal sunlight hours and climate zones, matching each user’s input against 8 parameters (climate zone, available space, pot preference, garden preference, harvest time, required light levels, difficulty of growing plant, if in budget) of varied weighting to provide the best suggestions to our users. The backend of the application is built with Python and we’ve used Flask for the server and developed and trained our plant disease detection model using PyTorch.

## Challenges we ran into
We wanted a virtual AR garden so that users can see what their living space could look like with plants. We struggled to find a way to easily prototype AR, because none of our laptops had native AR support, and we were unsure whether we could complete it in 24 hours.

We trained and extended a model which classified whether plants had diseases. However, we were again unsure whether we could complete this within 24 hours. As a fall-back plan, we have a troubleshooting Q&A so that users can self diagnose their plants’ diseases.


## Accomplishments that we're proud of
We’re immensely proud of the efforts of our team in building a functional prototype in under twenty four hours. We’re proud of the grit and determination our team members have put in to grow the idea of LeafyLInk to a reality. 

## What we learned
Our team gained the experience of working together to build LeafyLink in the span of twenty four hours from the conception of the idea to having a functional product. We're able to get hands-on experience building in languages we were not all familiar with - Javascript and python are certainly challenging languages to work with. We learnt how to host and deploy our site and integrate the front-end and back-end. We learned how to brainstorm empathetically, taking a human centered design approach and creating user flows that are seamless and logical. A vital learning was building software in a team - We gained practical experience working with git and utilizing version control to manage our files. Moreover, how to communicate ideas via written and visual means when rapid prototyping.

## What's next for LeafyLink
In the future we’d like to expand the community aspect of the app by adding more social integrations such as swapping plants and sharing growing tips. We recognise the value of growing together to one's social wellbeing. Further expansions include recommendations about composting and recipes which relate to the post-harvest lifecycle of our fresh produce. We’d love to partner with organizations such as OzHarvest which have initiatives targeting the mutual goal of preventing food waste and incentivise getting on the app. Together we propel towards greater awareness about conscious consumption. 

## Running locally 
npm i \
npm run dev 
