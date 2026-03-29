# Ping 

A small real-time chat app built while messing around with WebSockets and figuring out how messaging systems actually work.

Users can send direct messages or chat inside group rooms, with messages updating instantly through Socket.io. Conversations are stored in PostgreSQL so they still exist after refresh (because losing messages would be... unfortunate).

The UI leans into a **retro Windows-95 inspired style**, because modern chat apps are all minimal and this was more fun to build?(inspo by neocities)

---

## Features

• real-time messaging using WebSockets (Socket.io)
• private user chats
• group chat rooms
• persistent message storage with PostgreSQL
• retro Windows-95 inspired UI
• responsive chat layout
• auto-scrolling message window

---

## Tech Stack

Frontend
• Next.js
• React
• TailwindCSS
• Socket.io Client

Backend
• Node.js
• Express
• Socket.io

Database
• PostgreSQL

Deployment
• Vercel (frontend)
• Render (backend)

---

## Project Structure (roughly)

```
client/
  app/
    chat/
    grpchat/
    login/
    signup/
    components/

server/
  routes/
    auth.js
  sockets/
    socket.js
  server.js
```

Frontend handles UI + socket client logic
Backend handles APIs, sockets, and database queries.

---

## Running Locally

Clone the repo

```bash
git clone <repo-url>
```

Install dependencies

```bash
npm install
```

Run backend

```bash
node server.js
```

Run frontend

```bash
npm run dev
```

---

## Deployment

Frontend → Vercel
Backend → Render

(links here)

---

## Notes

This isn't meant to be a production chat system or anything like that mostly just a project built while exploring real-time communication and full-stack deployment.

But it works tho, messages send in real time, the database behaves, and the retro UI vibe is kinda fun?

---

## Possible Improvements

Things that would be cool to add later:

• typing indicators
• message timestamps
• online/offline status
• message pagination
• maybe some performance tuning

---
