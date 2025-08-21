# Encrypted Messenger App

A secure messaging app that works on web and mobile (iOS).

## Tech Stack

- Backend: Node.js + Express + MongoDB + Socket.io + JWT
- Web frontend: React
- Mobile frontend: React Native (Expo)
- Encryption: crypto-js (AES now, full E2E later)

## Structure

- `apps/backend`: API and socket server
- `apps/web`: Web chat UI
- `apps/mobile`: iOS app (Expo)
- `packages/shared`: Shared crypto and utility code

## Getting started

```bash
npm install
