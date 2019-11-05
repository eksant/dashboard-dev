###########################################################################
# How to :
# Build : docker build -t pfalfa-dashboard .
# Run : docker run --name pfalfa-dashboard -d -p 3000:3000 pfalfa-dashboard
###########################################################################

FROM node:10

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]