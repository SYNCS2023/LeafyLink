
const ExistingPlant = () => {
  return (
    <div>
      <p>existing plant</p>
      <input type="file" className="file-input w-full max-w-xs" accept="image/*" capture="environment"/>
      <select className='select select-bordered w-full max-w-xs'>
        <option disabled selected>
          Select your plant...
        </option>
        <option>Plant a</option>
        <option>Plant b</option>
        <option>Plant c</option>
        <option>Plant d</option>
      </select>
    </div>
  );
};

export default ExistingPlant;
