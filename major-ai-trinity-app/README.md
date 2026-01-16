# Major AI Trinity App (Web + Mobile)

Monorepo for:
- Web (Next.js + Tailwind)
- Mobile (Expo React Native)
- Shared core (3 agents + 30 pillars + schemas)

Agents:
- PILLAR (life / self-mastery)
- COME-UP (money / spiritual finance)
- CODEX (tech / AI sovereignty)

## Prereqs
- Node 18+ (20+ recommended)
- pnpm (`npm i -g pnpm`)

## Install
pnpm install

## Run Web
pnpm dev:web

## Run Mobile
pnpm dev:mobile

## Pillar Data (30)
packages/core/src/data/*.json

## Design Prompts
design/avatars_prompts.md

## Firebase Rules
firebase/firestore.rules
firebase/storage.rules

## Optional Web3 Stubs
packages/core/src/web3/*
