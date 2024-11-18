import "../CSS/style.css";
import { DOMselectors } from "./DOM.js";

async function getData() {
  //fetch returns a promise
  try {
    const response = await fetch(
      "https://dragonball-api.com/api/characters?limit=10000"
    );
    //guard clause
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      return data.items;
    }
  } catch (error) {
    console.log(error);
    alert("sorry could not find that champion");
  }
}

async function showImages() {
  let characters = await getData();
  console.log(characters);
  characters.forEach((char) =>
    DOMselectors.container.insertAdjacentHTML(
      "beforeend",
      `
    <img src="${char.image}"/>
    `
    )
  );
}

showImages();
