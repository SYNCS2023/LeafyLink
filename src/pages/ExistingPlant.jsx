import Webcam from "react-webcam";
import BackButton from "../components/BackButton";
import { useRef, useState } from "react";


const ExistingPlant = () => {
  const [plants, setPlants] = useState(JSON.parse(localStorage.getItem('plants')));
  const plantTypeRef = useRef();
  const plantNameRef = useRef();
  const plantImageRef = useRef();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result.split(',')[1]);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const createPlant = async () => {
    var newPlants = plants;
    let imageStr = await convertToBase64(plantImageRef.current.files[0]);
    console.log(imageStr);
    let addedPlant = {
      "type": plantTypeRef.current.value,
      "name": plantNameRef.current.value,
      "age": 0, 
      "likes": 0,
      "owned": true,
      "image": `data:image/png;base64,${imageStr}`
    };
    newPlants.push(addedPlant);
    console.log(addedPlant);
    setPlants(newPlants);
    localStorage.setItem('plants', JSON.stringify(newPlants));

    window.location.href = "/garden";
  };

  return (
    <div>
      <BackButton />
      <div>
        <p>Add an existing plant</p>
      </div>
      <div className="p-2 flex min-h-[40vh] items-center flex-col place-content-center">
        <div className="p-2"><Webcam /></div>
        <div>
          <input type="file" className="file-input w-full max-w-xs align-middle" accept="image/*" capture="environment" 
          ref={plantImageRef}/>
        </div>
      </div>
      <div className="p-2">
        <select className='select select-bordered w-full max-w-xs' defaultValue={"Select your plant..."}
              ref={plantTypeRef}>
          <option disabled>Select your plant...</option>
          <option>Plant a</option>
          <option>Plant b</option>
          <option>Plant c</option>
          <option>Plant d</option>
        </select>
      </div>
      <div className="p-2">
        <input type="text" placeholder="Enter the name of your plant:" 
        className="input input-bordered w-full max-w-xs" ref={plantNameRef}/>
      </div>
      <div className="p-2">
        <button className="btn btn-primary" onClick={createPlant}>Next</button>
      </div>
    </div>
  );
};

export default ExistingPlant;
