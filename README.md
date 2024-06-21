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

