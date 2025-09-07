# 🎮 NIMBUS  

NIMBUS is a modified version of the classical **mathematical strategy game NIM**.  
In the traditional game of NIM, two players take turns removing objects from distinct stacks, and the player who removes the last object wins.  

In **NIMBUS**, we’ve introduced exciting variations and a points-based system to make the game more competitive and fun!  


## 🕹️ Game Rules  

- Players can remove **only 1 or 2 objects** from a stack on their turn.  
- **Clearing a stack** rewards the player with **1 point**.  
- The player with the **most points** after all stacks are cleared is the **winner**.  



## ⚡ Game Modes  

NIMBUS features **4 unique game modes**:  

1. **Regular NIM** – The classic version of NIM.  
2. **Regular NIMBUS** – Modified rules (remove 1 or 2 objects, points for clearing stacks).  
3. **Vs Computer (AI Mode)** – Play against the computer AI.  
4. **Special NIMBUS** – Same as Regular NIMBUS, but each player can make **one special move** per game where they can remove **any number of objects** from a stack.  



## 🏗️ How It Works  

- **Randomized Initialization**:  
  - The number of stacks is chosen randomly (always **odd** to ensure a winner).  
  - Each stack contains **5–10 objects** randomly.  

- **TOSS Function**:  
  - Randomly decides which player makes the **first move** (to avoid first-move advantage).  

- **Game Flow**:  
  1. Player names are taken as input.  
  2. TOSS decides the starting player.  
  3. Players alternate turns, removing objects (1 or 2 at a time).  
  4. Invalid moves are handled gracefully.  
  5. Game ends when all stacks are cleared.  



## 📜 Game Log  

Every game is recorded in a **Game Log**.  
It stores:  
- Game Mode  
- Date & Time (using preprocessor macros)  
- Player Names  
- Scores  
- Winner  

Two functions are implemented:  
- One to **add data** to the log (appending to a text file).  
- One to **display the Game Log** as output.  



## 🏆 Leaderboard  

The **Leaderboard** tracks the top players for each game mode.  

- Winners’ names are appended to a text file.  
- Names are read and stored in a vector.  
- A `map` is used to **count frequency** of wins.  
- Players are **ranked and displayed**.  
- Leaderboard shows the **Top 5 Players**.  



## 📖 Additional Features  

- **Help Section** – Explains the rules of the game.  
- **Credits Section** – Acknowledges contributors.  



## 🚀 Tech Highlights  

- Implemented in **C++**.  
- Uses **file handling** for Game Log & Leaderboard.  
- Uses **maps, vectors, and sorting** for ranking players.  
- Includes **randomization** for game setup and toss.  



## 📷 Demo 
<img width="1439" height="806" alt="image" src="https://github.com/user-attachments/assets/aa907558-a96a-4efd-82e6-a8ee68162353" />
<img width="1439" height="813" alt="image" src="https://github.com/user-attachments/assets/90a08467-44d6-4896-888a-ded832aa48be" />




## 🤝 Contributors  

- Project by: **Syem, Aashnan & Moudud** 

---

## ▶️ Playing the Game  

To get started:  

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

✨ *Enjoy strategizing with NIMBUS and claim your spot on the Leaderboard!* ✨  
