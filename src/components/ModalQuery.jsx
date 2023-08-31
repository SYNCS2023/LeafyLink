import React from 'react';
import { useState } from 'react';
import ImageHandler from './ImageHandler';

const helpMsg = {
  Tomato___Bacterial_spot: (
    <>
      <h3 className='text-lg font-bold'>Your tomato: Bacterial Spots</h3>
      <p>
        Oh no your tomato plant has bacterial spots. Bacterial spot can be a
        devastating disease when the weather is warm and humid. Hot water
        treatment can be used to kill bacteria on and in seed.
      </p>
    </>
  ),
  Tomato___Early_blight: (
    <>
      <h3 className='text-lg font-bold'>Your tomato: Early Blight</h3>
      <p>
        What a shame! Your tomato plant has early blight. You can consider using
        fungicides containing active ingredients like chlorothalonil or copper.
        Follow the Begin applying fungicides preventively or at the first sign
        of symptoms. Regularly prune and remove affected leaves and stems to
        reduce the spread of the disease.
      </p>
    </>
  ),
  Tomato___Late_blight: (
    <>
      <h3 className='text-lg font-bold'>Your tomato: Late Blight</h3>
      <p>
        Boohoo your tomato plan has late blight 😦 Treating late blight in
        tomato plants requires a multi-pronged approach to effectively manage
        the disease. As soon as symptoms are noticed, it's crucial to remove and
        dispose of any infected plant parts to prevent its spread. Applying
        fungicides with copper-based compounds or other effective ingredients
        can help halt the disease's progression. Improving air circulation by
        pruning excess foliage and using drip irrigation to water at the base of
        plants can create an environment less favorable for the pathogen. Opting
        for tomato varieties resistant to late blight can offer long-term
        protection.
      </p>
    </>
  ),
  Tomato___Leaf_Mold: (
    <>
      <h3 className='text-lg font-bold'>Your tomato: Leaf Mold</h3>
      <p>
        Your tomato plant has leaf mould, you can consider Copper-based
        fungicides which can help prevent the spread of tomato leaf mold. Follow
        the manufacturer's instructions for proper usage and safety precautions.
        Some biofungicides containing beneficial microbes or plant extracts can
        also help control the disease without using harsh chemicals.{' '}
      </p>
    </>
  ),
  Tomato___Septoria_leaf_spot: (
    <>
      <h3 className='text-lg font-bold'>Your tomato: Septoria leaf spot</h3>
      <p>
        You can treat your tomato plant’s septoria spots by watering the plants
        at the base to keep foliage dry and minimize humidity. Apply fungicides
        containing chlorothalonil or copper, adhering to recommended application
        schedules. Pruning the lower leaves and promoting good air circulation
        through staking or caging can hinder the fungus's growth.
      </p>
    </>
  ),
  'Tomato___Spider_mites Two-spotted_spider_mite': (
    <>
      <h3 className='text-lg font-bold'>
        Your tomato: Two spotted spider mite
      </h3>
      <p>
        It looks like spider mites! Applying insecticidal soap or neem oil can
        be effective in controlling mites while being less harmful to beneficial
        insects. Ensure the plants are well-watered and not under stress, as
        healthy plants can better resist infestations. Regularly inspect the
        undersides of leaves for signs of mites, such as webbing and stippling
        damage, and intervene early. Consider isolating new plants before
        introducing them to your garden to prevent introducing mites
      </p>
    </>
  ),
  Tomato___Target_Spot: (
    <>
      <h3 className='text-lg font-bold'>Your tomato: Target Spot</h3>
      <p>
        Your tomato plant has target spot. Improve air circulation by proper
        spacing, pruning, and avoiding overhead watering. Apply fungicides
        containing chlorothalonil or other effective ingredients as per
        recommendations. Mulch around the base of plants to prevent soil
        splashing onto leaves. Water at the base to keep foliage dry, reducing
        humidity. Regularly monitor plants for symptoms and promptly treat any
        detected cases.
      </p>
    </>
  ),
  Tomato___Tomato_Yellow_Leaf_Curl_Virus: (
    <>
      <h3 className='text-lg font-bold'>Your tomato: Yellow Leaf Curl Virus</h3>
      <p>
        Your tomato has yellow leaf curl virus. Opt for resistant tomato
        varieties and maintain a clean garden to deter both whiteflies and the
        virus. Reflective mulch, cultural practices like proper spacing, and
        pruning can discourage whiteflies and slow disease progression. Consider
        using insecticides if needed, and stay vigilant in early detection.
        Collaborating with local experts offers tailored guidance to effectively
        manage this challenging virus and protect your tomato plants.
      </p>
    </>
  ),
  Tomato___Tomato_mosaic_virus: (
    <>
      <h3 className='text-lg font-bold'>Your tomato: Mosaic Virus</h3>
      <p>
        Oh no your plant is infected with mosaic virus. Control aphids, the
        primary vectors, using suitable methods to minimize transmission.
        Swiftly remove and dispose of infected plants upon symptom detection,
        and opt for resistant tomato varieties to reduce susceptibility. Keep
        your garden weed-free and maintain plant health through proper nutrition
        and watering.
      </p>
    </>
  ),
  Tomato___healthy: (
    <>
      <h3 className='text-lg font-bold'>Your tomato: Healthy</h3>
      <p>
        Your tomato plant is healthy, cherish it well and give it lots of love.
      </p>
    </>
  ),
  // Potato___Late_blight
  default: (
    <>
      <h3 className='text-lg font-bond'>
        Sorry, this image has not been recognised.
      </h3>
    </>
  ),
};

const ModalQuery = () => {
  const [loading, setLoading] = useState('imagepicker');
  const [msg, setMsg] = useState(<></>); // troubleshoot msg
  const [capturedImage, setCapturedImage] = useState(null);

  const convertImageToDataURL = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject('Error reading image file');
      };
      reader.readAsDataURL(blob);
    });
  };

  // "AI generates troubleshoot msg" for 1.5 seconds :]
  // this has unintended behaviour when troubleshoot button clicked too frequently
  const loadTroubleshoot = async () => {
    setLoading('imagepicker');
    setCapturedImage(null);
    //   setLoading(true);

    //   setTimeout(() => {
    //     setLoading(false);
    //     setMsg(randChoice(helpMsg));
    //   }, 1500);
    //   setLoading(false);
  };

  const requestPlantProblem = async () => {
    setLoading('loading');
    let image_data = capturedImage;
    let resp = await fetch('https://leafylinkbackend.ryno.codes/predict_image', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image_data: image_data }),
    });
    let resp_data = await resp.json();
    setMsg(helpMsg[resp_data.prediction] || helpMsg['default']);
    setLoading('message');
  };

  return (
    <>
      <label htmlFor='my_modal2' className='btn btn-primary'>
        Troubleshoot
      </label>
      <input
        type='checkbox'
        id='my_modal2'
        className='modal-toggle'
        onClick={() => loadTroubleshoot()}
      />
      <div className='modal'>
        <div className='modal-box max-w-screen-2xl'>
          {loading === 'imagepicker' ? (
            <div className='p-2 flex min-h-[40vh] items-center justify-center flex-col place-content-center'>
              <ImageHandler
                onCapture={(imageSrc) => setCapturedImage(imageSrc)}
                onFileChange={(imageSrc) => setCapturedImage(imageSrc)}
              />
              <p className='p-2'>Selected image:</p>
              {capturedImage && <img src={capturedImage} alt='Captured' />}
              <button className='btn btn-primary' onClick={requestPlantProblem}>
                Submit
              </button>
            </div>
          ) : loading === 'loading' ? (
            <span className='loading loading-spinner loading-lg text-center'></span>
          ) : (
            <div className='text-left'>{msg}</div>
          )}
        </div>
        <label className='modal-backdrop' htmlFor='my_modal2'>
          Close
        </label>
      </div>
    </>
  );
};

export default ModalQuery;
