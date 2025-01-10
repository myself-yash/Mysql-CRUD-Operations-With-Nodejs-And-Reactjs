FROM node:20
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
COPY wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it
CMD ["./wait-for-it.sh", "db:3306", "--", "npm", "start"]
