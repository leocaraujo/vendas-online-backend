FROM node:20-slim

RUN apt-get update || : && apt-get install -y \ 
  python3 \ 
  build-essential


WORKDIR /home/node/app


USER node

CMD ["tail", "-f", "/dev/null"]