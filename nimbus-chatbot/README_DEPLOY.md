# Nimbus Chatbot Deployment

This project is ready to deploy as a simple Node.js application.

## Deploy locally with Docker

1. Build the image:

```bash
docker build -t nimbus-chatbot .
```

2. Run the container:

```bash
docker run -p 3000:3000 nimbus-chatbot
```

3. Open http://localhost:3000

## Deploy to a cloud provider

Any platform that supports Node.js or Docker can host this app.

- Use the Dockerfile if the provider supports containers.
- Otherwise, deploy the app as a standard Node.js app with `npm start`.
