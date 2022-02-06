[![Testing Actions Status](https://github.com/abdabdii/drawing-api/workflows/Testing/badge.svg)](https://github.com/abdabdii/drawing-api/actions)

# Drawing Api

This project was made for mintbean hackathon for Jr developers Check them out:

[Mintbean][Mintbean]

[Mintbean]: https://mintbean.io/ "Mintbean"

### How to start:
Clone this repo

`$ git clone https://github.com/abdabdii/drawing-api`

Go to directory

`$ cd ./drawing-api`

Run npm install

`$ npm install`

Then to generate a pair of public and private key

`$ node generateKeyPair.js`

Make .env file that contains
- MONGODB_URI=(Whatever your mongodb URI is)
- TEST_MONGODB_URI=(Mongodb URI for testing)
- PORT=

Start nodemon server:

`$ npm run server`

Now you can visit the api docs at:

localhost:PORT/api/docs

Or visit it live at

[Drawing API](https://drawing-api-project.herokuapp.com/api/docs "Drawing API")

&copy; Abdalrashid 2021


