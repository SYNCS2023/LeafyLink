const SuggestPlant = () => {
  return (
    <div>
      <p>Suggest a plant for me</p>
      <select className='select select-bordered w-full max-w-xs'>
        <option disabled selected>
          What kind of property are you living in?
        </option>
        <option>House</option>
        <option>Apartment/Unit</option>
        <option>Single Room</option>
        <option>Caravan</option>
      </select>
    </div>
  );
};

export default SuggestPlant;
