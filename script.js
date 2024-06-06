import { config } from "dotenv";
config();

import OpenAI from "openai";
import readline from "readline";

// Initialize the OpenAI client with the configuration
const openAi = new OpenAI({
  apiKey: process.env.API_KEY,
});

// Set up the readline interface for user input
const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();

userInterface.on("line", async (input) => {
  try {
    const response = await openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    });
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
  userInterface.prompt();
});
