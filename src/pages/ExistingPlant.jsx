import Webcam from "react-webcam";
import BackButton from "../components/BackButton";


const ExistingPlant = () => {
  return (
    <div>
      <BackButton />
      <div>
        <p>Add an existing plant</p>
      </div>
      <div className="p-2 flex min-h-[40vh] items-center flex-col place-content-center">
        <div className="p-2"><Webcam /></div>
        <div>
          <input type="file" className="file-input w-full max-w-xs align-middle" accept="image/*" capture="environment"/>
        </div>
      </div>
      <div className="p-2">
        <select className='select select-bordered w-full max-w-xs' defaultValue={"Select your plant..."}>
          <option disabled>Select your plant...</option>
          <option>Plant a</option>
          <option>Plant b</option>
          <option>Plant c</option>
          <option>Plant d</option>
        </select>
      </div>
      <div className="p-2">
        <input type="text" placeholder="Enter the name of your plant:" className="input input-bordered w-full max-w-xs" />
      </div>
      <div className="p-2">
        <button className="btn btn-primary">Next</button>
      </div>
    </div>
  );
};

export default ExistingPlant;
