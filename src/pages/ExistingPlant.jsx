import Webcam from "react-webcam";
import BackButton from "../components/BackButton";
import { useRef, useState } from "react";
import { config } from "../logic/constants";


const ExistingPlant = () => {
  const [plants, setPlants] = useState(JSON.parse(localStorage.getItem('plants')));
  const plantTypeRef = useRef();
  const plantNameRef = useRef();
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [userImage, setUserImage] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setUserImage(true);
  };

  const handleFileChange = (event_main) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setCapturedImage(event.target.result);
    };
    reader.readAsDataURL(event_main.target.files[0]);
    setUserImage(true);
  };
  const plantTypeChanged = (event) => {
    if (!userImage) {
      if (event.target.value === 'Apple') {
        setCapturedImage(config.base + '/images/apple.png');
      } else if (event.target.value === 'Banana') {
        setCapturedImage(config.base + '/images/banana.png');
      } else if (event.target.value === 'Grape') {
        setCapturedImage(config.base + '/images/grape.png');
      } else if (event.target.value === 'Melon') {
        setCapturedImage(config.base + '/images/melon.png');
      } else if (event.target.value === 'Strawberry') {
        setCapturedImage(config.base + '/images/strawberry.png');
      }
    }
  };
  
  const createPlant = async () => {
    var newPlants = plants;
    let imageStr = capturedImage
    let nextId = Math.max.apply(Math, plants.map(function(o) { return o.id; })) + 1;
    let addedPlant = {
      "id": nextId,
      "img": capturedImage,
      "type": plantTypeRef.current.value,
      "age": 0, 
      "likes": 0,
      "owned": true,
      "name": plantNameRef.current.value,
      "user": "self",
      "description": "self"
    };
    newPlants.push(addedPlant);
    setPlants(newPlants);
    localStorage.setItem('plants', JSON.stringify(newPlants));

    window.location.href = config.base + "/#/garden";

  //   console.log(await (await fetch('/api/predict_image', {
  //     method: 'PUT',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({"image_data": capturedImage})
  // })).json());
  };

  return (
    <div>
      <BackButton />
      <div>
        <p>Add an existing plant</p>
      </div>
      <div className="p-2">
        <select className='select select-bordered w-full max-w-xs' defaultValue={"Select your plant..."}
              ref={plantTypeRef} onChange={plantTypeChanged}>
          <option disabled>Select your plant...</option>
          <option>Banana</option>
          <option>Apple</option>
          <option>Grape</option>
          <option>Melon</option>
          <option>Strawberry</option>
        </select>
      </div>
      <div className="p-2">
        <input type="text" placeholder="Enter the name of your plant:" 
        className="input input-bordered w-full max-w-xs" ref={plantNameRef}/>
      </div>

      <div className="p-2 flex min-h-[40vh] items-center justify-center flex-col place-content-center">
          <p className="p-2">Provide an image of your plant:</p>
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg"  />
          <div className="flex flex-row items-center justify-center place-content-center p-2">
          <button className="btn btn-primary" onClick={capture}>Capture</button>
          <p>&nbsp;OR&nbsp;</p>
          <input type="file" className="file-input w-full max-w-xs align-middle" accept="image/*" onChange={handleFileChange} />
          </div>
          <p className="p-2">Selected image:</p>
          {capturedImage && <img src={capturedImage} alt="Captured" />}
      </div>
      <div className="p-2">
        <button className="btn btn-primary" onClick={createPlant}>Next</button>
      </div>
    </div>
  );
};

export default ExistingPlant;
