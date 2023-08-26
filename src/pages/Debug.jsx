import defaultPlantData from '../assets/defaultPlants.json'
const Debug = () => {
    return <button className="btn btn-primary" onClick={()=>{localStorage.setItem('plants', JSON.stringify(defaultPlantData));}}>Reset Data</button>;
};

export default Debug;
