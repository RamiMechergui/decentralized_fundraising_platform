FROM node:18

WORKDIR ./app

COPY . .
COPY package.json .
COPY initial.js .
RUN npm install .

EXPOSE 30315

CMD ["npm","start"]
