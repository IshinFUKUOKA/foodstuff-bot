FROM node:10-slim

WORKDIR /app
ADD . /app

RUN groupadd -r foodstuff && useradd -r -g foodstuff foodstuff
RUN mkdir -p /home/foodstuff/.config && chown -R foodstuff:foodstuff /home/foodstuff

EXPOSE 3000
USER foodstuff
RUN npm install
CMD ["npm", "start"]
