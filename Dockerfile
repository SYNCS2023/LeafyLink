FROM node:20-alpine

WORKDIR /leafylink

COPY package.json .
RUN npm install --loglevel verbose

# code is baked in
COPY . .

# a dodgy fix so that everything is from the base url /LeafyLink
# so that github pages also works
RUN npm run build
RUN mkdir dist/LeafyLink
RUN mv dist/assets dist/images dist/LeafyLink

RUN npm install -g serve
ENTRYPOINT [ "serve", "-p", "5000", "-s", "dist" ]