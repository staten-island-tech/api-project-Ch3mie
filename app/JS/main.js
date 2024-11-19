import "../CSS/style.css";
import { DOMselectors } from "./DOM.js";

async function getData() {
  try {
    const response = await fetch(
      "https://dragonball-api.com/api/characters?limit=10000"
    );

    if (response.status !== 200) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    data.items.forEach((character) => {
      console.log(character.name);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Sorry, could not find character");
  }
}

getData();

function createcards() {}
