from flask import Flask, request, jsonify
import torch
import torchvision
import torch.nn as nn
import torch.nn.functional as F
from PIL import Image
from torchvision.transforms import ToTensor
import torchvision.transforms as transforms
import pickle
from io import BytesIO
import base64

class Network(nn.Module):
    def __init__(self):
        super(Network,self).__init__()

        # CNNs for rgb images 
        self.conv1= nn.Conv2d(in_channels=3,out_channels=6,kernel_size=5)
        self.conv2= nn.Conv2d(in_channels=6,out_channels=12,kernel_size=5)
        self.conv3= nn.Conv2d(in_channels=12,out_channels=24,kernel_size=5)
        self.conv4= nn.Conv2d(in_channels=24,out_channels=48,kernel_size=5)
        
        # Connecting CNN outputs with Fully Connected layers
        self.fc1 = nn.Linear(in_features=48*12*12,out_features=240)
        self.fc2 = nn.Linear(in_features=240,out_features=120)
        self.out = nn.Linear(in_features=120,out_features=17)
        
        
    def forward(self,t):
        t = t
        
        t=self.conv1(t)
        t=F.relu(t)
        t=F.max_pool2d(t,kernel_size = 2, stride = 2)
        
        
        t=self.conv2(t)
        t=F.relu(t)
        t=F.max_pool2d(t,kernel_size = 2, stride = 2)

        t=self.conv3(t)
        t=F.relu(t)
        t=F.max_pool2d(t,kernel_size = 2, stride = 2)

        t=self.conv4(t)
        t=F.relu(t)
        t=F.max_pool2d(t,kernel_size = 2, stride = 2)
        
        t=t.reshape(-1,48*12*12)
        t=self.fc1(t)
        t=F.relu(t)
        
        
        t=self.fc2(t)
        t=F.relu(t)
        
        t=self.out(t)
        
        
        return t

model = Network()  # Instantiate your model architecture
model_path = 'model.pth'  # Replace with the actual path
checkpoint = torch.load(model_path)
model.load_state_dict(checkpoint)
model.eval()  # Set the model in evaluation mode
with open('labels.json', 'rb') as f:
    reference = pickle.load(f)

def predict_image_file(image):
    image = image.convert('RGB')
    image = ToTensor()(image)
    resize = transforms.Compose([transforms.Resize((256,256))])
    y_result = model(resize(image).unsqueeze(0))
    result_idx = y_result.argmax(dim=1)
    for key,value in reference.items():
        if(value==result_idx):
            return key
    return "Failed"
def predict(img_path):
    image = Image.open(img_path)
    return predict_image_file(image)



app = Flask(__name__)

@app.route('/predict_image', methods=['PUT','OPTIONS'])
def predict_image():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
    else:
        try:
            # Get the JSON data from the request
            data = request.json

            # Extract the base64 encoded image from the data
            image_base64 = data.get('image_data').split(',')[1]
            # Decode base64 and create a PIL Image
            image_data = base64.b64decode(image_base64)
            # print(hex(hash(image_data)))
            image_pil = Image.open(BytesIO(image_data))
            prediction = predict_image_file(image_pil)
            # print(f"{prediction=}")
            response = jsonify({"prediction": prediction})
        except Exception as e:
            response = jsonify({"prediction": str(e)})
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, OPTIONS' 
    return response

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    print(predict("TomatoYellowCurlVirus1.JPG"))
    app.run(debug=True)