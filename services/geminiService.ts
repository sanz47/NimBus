import { GoogleGenAI, Type } from "@google/genai";
import { Player, Move } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getAiMove = async (
  stacks: number[],
  players: Player[],
  aiPlayerIndex: number
): Promise<Move> => {
  const model = "gemini-2.5-flash";
  const validStackIndices = stacks
    .map((s, i) => (s > 0 ? i : -1))
    .filter((i) => i !== -1);

  const prompt = `
    You are a world-class expert in the game of Nim (specifically, the Nim-bus variant). Your goal is to make the optimal move to win.

    Game Rules:
    1. There are multiple stacks of disks.
    2. Players take turns removing 1 or 2 disks from a single stack.
    3. When a player empties a stack, they get 1 point.
    4. The game ends when all stacks are empty.
    5. The player with the most points wins.

    Current Game State:
    - Stacks: [${stacks.join(", ")}] (The value at each index represents the number of disks in that stack).
    - Your score: ${players[aiPlayerIndex].score}
    - Opponent's score: ${players[(aiPlayerIndex + 1) % 2].score}
    - It is your turn to move.

    Your task:
    Analyze the game state and determine the best possible move. A good move might be to empty a stack to score a point, or to set up a future move that prevents your opponent from scoring.
    
    You must choose a stack to take from and the number of disks to remove (1 or 2).
    - The stack you choose must not be empty.
    - You cannot remove more disks than are in the chosen stack.

    Respond with ONLY a JSON object indicating your chosen move.
    `;
  
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            stackIndex: { 
              type: Type.INTEGER, 
              description: `The index of the stack to remove disks from. Must be one of [${validStackIndices.join(', ')}].` 
            },
            disksToRemove: { 
              type: Type.INTEGER, 
              description: 'The number of disks to remove. Must be 1 or 2.' 
            },
            reasoning: {
                type: Type.STRING,
                description: 'A brief explanation of your strategic choice.'
            }
          },
          required: ["stackIndex", "disksToRemove", "reasoning"]
        },
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    const jsonString = response.text;
    const moveData = JSON.parse(jsonString);

    console.log("AI Reasoning:", moveData.reasoning);

    // Validate the AI's move
    if (
      typeof moveData.stackIndex !== 'number' ||
      !validStackIndices.includes(moveData.stackIndex) ||
      (moveData.disksToRemove !== 1 && moveData.disksToRemove !== 2) ||
      stacks[moveData.stackIndex] < moveData.disksToRemove
    ) {
      console.error("AI returned an invalid move:", moveData);
      throw new Error("AI returned invalid move");
    }

    return {
      stackIndex: moveData.stackIndex,
      disksToRemove: moveData.disksToRemove,
    };
  } catch (error) {
    console.error("Error getting AI move from Gemini:", error);
    throw error;
  }
};
