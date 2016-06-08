# chat

A very (very) simple chat server with web client interface. which is used to build a trial 
app for IOS device.

This app is opened in the webview of the nativeIOS code. wherein it used the websockets n nodejs
powers to implement a simple chat app.

- In server.js
  User can change the PORT and IPADDRESS values.
  change above value also requires to change URLWithString in viewController.m file to the new Address


Local Development + Testing
===========================

You can test  this your Node application locally on your machine
(workstation). In order to do this, you will need to perform some
basic setup - install Node + the npm modules.

Setup steps:
	- npm install -d 
	  [optional] us can delete the the node_modules folder
	  which looks for the package.json. 
	  package.json contains depenency for the node module, and running above command will get u all depenceny files
	  
	- node server.js
	  this runs your node server.
	   
	- http://127.0.0.1:8490/
	  load up a web browser and point it to, in our case we need to copy this URL to the viewController.m loadRequest of url.
	  Also note to open mulitple instance or add more user to chat. open more web browser at same time.
      
   - To run this app in IOS stimulor
     open the Chat!.xcodeproj with Xcode and run / built the app