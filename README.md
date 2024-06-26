# Simple WebRTC Client + Dockerized Asterisk Demo

This project demonstrates a simple WebRTC client integrated with a Dockerized Asterisk server.

## How to Run

### Step 1: Clone the Repository
First, you need to clone the repository to your local machine. Open your terminal and run the following command:

```bash
git clone https://github.com/radetsky/asterisk-webrtc-demo.git
```

### Step 2: Navigate to the Project Directory

Change your current directory to the project directory:
```
cd asterisk-webrtc-demo
```

### Step 3: Run Docker Compose
To start the application, use Docker Compose to build and run the containers. Execute the following command in your terminal:
```
docker-compose up
```

### Step 4: Open the Web Interface
Once the containers are running, open your web browser and navigate to:
```
http://localhost:8080/
or 
https://localhost:8089/
```

### Step 5: Interact with the WebRTC Client
You should see a green button at the bottom right corner of the page. Follow these steps:

1. Press the Green Button: This will open the main window with a single button.
2. Check the Button Label: The button should be labeled "Ready to call".
3. Press the button. Give all required permissions to the browser.
Use Chrome instead of Safari.
4. Say "Hi!". You should hear the work of Echo() application.


### Troubleshooting
Widget Not Initialized: If the button label shows "Widget not initialized", check the JavaScript console in your browser for any errors.
Docker Logs: Also, check the Docker logs for any issues by running:


## How to use WSS and Let's Encrypt or other legal keys? 

1. Put the keys onto asterisk directory and use it in http.conf:

```
[general]
enabled=yes
bindaddr=0.0.0.0
bindport=8088
tlsenable=yes
tlsbindaddr=0.0.0.0:443
tlscertfile=/etc/asterisk/letsencrypt/fullchain.pem
tlsprivatekey=/etc/asterisk/letsencrypt/privkey.pem
enable_static=yes
redirect = / /static/index.html
```

You can use self signed keys, but your browser will display warning about it. 

2. Compile your application and put into folder with static files for your webserver. Example: /var/lib/asterisk/static-http 

```
npm run build
rsync -av build /var/lib/asterisk/static-http
```

3. Configure the application to use WSS, not ws. 

```
const defaultConfiguration = {
    sockets: [],
    uri: 'sip:webrtc_client@securetelephonyutility.com',
    password: 'webrtc_client',
    wss: 'wss://securetelephonyutility.com:443/ws',
    hostname: 'securetelephonyutility.com'
};
```

HTTPS and WebSocket Secure (WSS) functionality is only available when your browser is also using HTTPS.

Example: https://securetelephonyutility.com/

When running the developer version of the application using the command npm start, the browser defaults to using the HTTP protocol, which lacks TLS (Transport Layer Security).

To ensure secure connections in this scenario, you need to configure a proxy that facilitates an HTTPS connection to the browser.



