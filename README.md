# 🏴‍☠️ Pirate Chest

**A daily treasure hunting puzzle game built on Reddit's Developer Platform.**

Welcome to **Pirate Chest**, a logic puzzle game where you hunt for buried treasures and use clues to pinpoint the loot. But keep a weather eye - one wrong step on a hidden bomb, and you'll be feeding the fish!

## 🦜 About The Game

Your goal is to find all the hidden treasures (Gold 💰, Chests 📦, Coconuts 🥥) without running out of Rum or hitting a Bomb.

### How to Read the Map

Unlike classic minesweepers, this map requires a true treasure hunter's intuition:

- **The Clue (Number):** Represents the **distance** (number of steps) to the nearest treasure in a straight line (horizontally or vertically).
- **Bomb Detector:** Watch out for warnings! The detector only scans for bombs in the immediately **adjacent** lands.
- **Rum (Moves):** Every tile you reveal costs Rum. Plan your path wisely, or you'll be marooned!

## ⚔️ Game Modes

### 📅 Daily Raid

A unique, generated map available for 24 hours.

- **Fair Play:** Every captain faces the exact same map layout.
- **One Shot:** You only have one attempt per day to claim the loot.
- **Raid Log:** Compete against other pirates for the fastest time and highest score.

### ⚓ Practice Voyage

Unlimited random maps to sharpen your skills.

- Play as much as you want.
- Perfect for learning how to triangulate treasure locations.

## 🏆 Leaderboards

- **Raid Log (Daily):** Daily ranking of the most efficient pirates.
- **Hall of Fame (Weekly):** The most legendary captains of the week.
- **Bragging Rights:** Generate unique, pirate-themed comments to share your victory (or hilarious defeat) with the community.

## 🛠️ Tech Stack

Built with ❤️ and ☕ using the **Devvit** platform.

- **Frontend:** React, TailwindCSS
- **Backend:** Devvit (Reddit's Serverless Platform)
- **Data:** Redis
- **Language:** TypeScript

---

## 🚀 Getting Started

> **Prerequisites:** Make sure you have Node.js 22+ installed.

1.  **Install Dependencies:**

    ```bash
    npm install
    ```

2.  **Run Development Server:**
    To test the app inside a simulated Reddit environment:

    ```bash
    npm run dev
    ```

3.  **Upload & Publish:**

- `npm run build`: Compiles the code.
- `npm run deploy`: Uploads a private version.
- `npm run launch`: Submits your app for review.

## 📜 Commands Reference

| Command          | Description                    |
| :--------------- | :----------------------------- |
| `npm run dev`    | Starts the local dev server    |
| `npm run build`  | Builds the project             |
| `npm run check`  | Runs type checking and linting |
| `npm run deploy` | Deploys to Reddit servers      |

---

**Good Fortune, Matey!** 🌊
