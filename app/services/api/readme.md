# API service
The API service works as an interface to the application's APIs. 

## api methods
This will contain helper functions for sending fetch requests and methods you define for each api call.

## mocked api methods
This is a place for you to add mocked versions of the methods you need for your api calls. It contains some simple helper functions and a basic example using mock data from a json file. The demo app has more examples, where mock data is generated randomly using faker.js.

## mock config
You can easily switch between mocked or non-mocked methods, and control behaviour, by editing the ```app/mock-config.js``` file.

The config also let you combine the mocked api methods with  mocked authentication, which allows you to develop your app independently from any infrastructure.