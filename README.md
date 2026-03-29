# Ping 

A small real-time chat app built while messing around with WebSockets and figuring out how messaging systems actually work.

Users can send direct messages or chat inside group rooms, with messages updating instantly through Socket.io. Conversations are stored in PostgreSQL so they still exist after refresh (because losing messages would be... unfortunate).

The UI leans into a **retro Windows-95 inspired style**, because modern chat apps are all minimal and this was more fun to build.
(Inspo partly from the chaotic beauty of Neocities.)

---

## Features

* real-time messaging using WebSockets (Socket.io)
* private user chats
* group chat rooms
* persistent message storage with PostgreSQL
* retro Windows-95 inspired UI
* responsive chat layout
* auto-scrolling message window

---

## Tech Stack

**Frontend**

* Next.js
* React
* TailwindCSS
* Socket.io Client

**Backend**

* Node.js
* Express
* Socket.io

**Database**

* PostgreSQL

**Deployment**

* Vercel (frontend)
* Render (backend)

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

Frontend handles the UI and socket client logic.
Backend handles APIs, WebSocket events, and database queries.

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
DB → Render

Frontend:  
[Chat App](https://ping-chi-puce.vercel.app/)

Backend API:  
[Render Server](https://ping-backend-d6rp.onrender.com)

---

## Basic Workflow

* Users authenticate through Express routes and are stored in PostgreSQL.
* The frontend queries the `/users` search endpoint to find other usernames.
* Selecting a user opens a chat where previous messages are fetched from the `/s/messages` API.
* Messages are sent through a **Socket.io `newmessage` event**.
* The backend persists the message in PostgreSQL and emits it to the recipient's active socket.
* Group chats use **Socket.io rooms**, where users join via `joinRoom` and messages are broadcast with `groupmessage`.
* Historical messages are retrieved via REST APIs, while real-time updates are handled through WebSocket events.

## Notes

This isn’t meant to be a production chat system or anything like that mostly just a project built while exploring real-time communication and full-stack deployment.(yes there are definitely flaws)

But it works tho. Messages send in real time, the database behaves, and the retro UI vibe is kinda fun.

---

## Possible Improvements

Things that would be cool to add later:

* typing indicators
* message timestamps
* online/offline status
* message pagination
* maybe some performance tuning
