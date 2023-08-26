// Constants.js
const production = {
    base: '/LeafyLink'
};
const development = {
    base: ''
};
  
export const config = process.env.NODE_ENV === 'development' ? development : production;