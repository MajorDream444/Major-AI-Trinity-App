
* # Major AI Mindset Trinity App
*
* This is a cross-platform web + mobile app designed to deploy the 3 interactive agents:
* - 🧠 PILLAR (Self-Mastery)
* - 💸 COME-UP (Spiritual Finance)
* - 🤖 CODEX (AI + Sovereignty)
*
* Each agent pairs with its own book, supports journal tracking, gamified quests, and AI-backed coaching.
*
* ## Technologies
* - Frontend: Next.js (React) + Tailwind CSS
* - Backend: Firebase (Auth + Firestore)
* - AI Layer: OpenAI GPT API
* - Optional: XMTP / Lit Protocol (Web3 Messaging / Auth)
*
* ## Dev Setup
* ```bash
* git clone https://github.com/your-org/major-ai-trinity-app.git
* cd major-ai-trinity-app
* npm install
* npm run dev
* ```
*
* ## File Structure
* See `/src/agents`, `/src/data`, and `/src/pages` for core logic.
* Each agent maps to 10 pillars with daily actions, reflection prompts, and progress tracking.
*
* ## JSON Content Format
* Pillar JSON files should follow this format:
* ```json
* {
* "id": 1,
* "name": "Mindset Mastery",
* "quote": "You don’t rise to the level of your goals...",
* "whatItMeans": "Mindset is the foundation...",
* "coreConcepts": ["Resilience", "EQ", "Growth Mindset"],
* "realWorld": "Kobe Bryant's Mamba Mentality...",
* "actions": ["Daily mental conditioning", "30-day challenge"]
* }
* ```
*
* ## License
* MIT
*/
