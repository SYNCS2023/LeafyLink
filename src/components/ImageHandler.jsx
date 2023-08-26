import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const ImageHandler = ({ onCapture, onFileChange }) => {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      onFileChange(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='p-2 flex min-h-[40vh] items-center justify-center flex-col place-content-center'>
      <p className='p-2'>Provide an image of your plant:</p>
      <Webcam
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        videoConstraints={{
          facingMode: { ideal: 'environment' },
        }}
      />
      <div className='flex flex-row items-center justify-center place-content-center p-2'>
        <button className='btn btn-primary btn-outline' onClick={capture}>
          Capture
        </button>
        <p>&nbsp;OR&nbsp;</p>
        <input
          type='file'
          className='file-input w-full max-w-xs align-middle'
          accept='image/*'
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageHandler;
