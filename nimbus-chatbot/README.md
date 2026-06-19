# Nimbus — a simple AI chatbot

A small full-stack chatbot: a plain HTML/CSS/JS frontend, and a tiny Express
backend that holds your openai API key and forwards chat requests so the key
is never exposed to the browser.

## 1. Get an API key

Create a key at https://console.anthropic.com (Settings → API Keys). New
accounts get some free credits, which is enough to test this project.

## 2. Install Node.js

You need Node.js 18 or later. Check with:

```
node -v
```

If that fails or shows an older version, install Node from
https://nodejs.org (the LTS version).

## 3. Install dependencies

From inside this project folder, run:

```
npm install
```

## 4. Add your API key

Copy the example env file and fill in your real key:

```
cp .env.example .env
```

Then open `.env` and replace `your_api_key_here` with your actual key.
`.env` is already in `.gitignore`, so it will never be uploaded to GitHub.

## 5. Run it

```
npm start
```

Then open http://localhost:3000 in your browser.

## Uploading to GitHub

1. Create a new, empty repository on GitHub (no README/license, since you
   already have files locally) and copy its URL.
2. In this project folder, run:

```
git init
git add .
git commit -m "Initial commit: Nimbus chatbot"
git branch -M main
git remote add origin PASTE_YOUR_REPO_URL_HERE
git push -u origin main
```

Because `.env` is gitignored, only `.env.example` goes up — your real key
stays on your machine. Double check this on GitHub after pushing: your repo
should NOT contain a `.env` file.

If you'd rather not use the command line, GitHub Desktop
(https://desktop.github.com) does the same steps through a UI: open the
folder as a local repository, write a commit message, click "Commit", then
"Publish repository".

## Deploying it for real (optional)

Running locally is great for development, but a resume project usually
needs a live link. Since this already has a backend, you can deploy the
whole folder as-is to a host like Render or Railway (both have free tiers
for small Node apps): connect your GitHub repo, set the `ANTHROPIC_API_KEY`
environment variable in their dashboard, and set the start command to
`npm start`.
