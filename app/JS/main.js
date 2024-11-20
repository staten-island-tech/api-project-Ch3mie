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
      createcards(character.image, character.race, character.name);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Sorry, could not find character");
  }
}

getData();

function createcards(img, desc, title) {
  DOMselectors.container.insertAdjacentHTML(
    "beforeend",
    `<div class="card bg-base-100 w-96 shadow-xl">
       <figure>
         <img src="${img}" alt="${desc}" />
       </figure>
       <div class="card-body">
         <h2 class="card-title">${title}</h2>
         <p>${desc}</p>
         <div class="card-actions justify-end">
           <button class="btn btn-primary">Buy Now</button>
         </div>
       </div>
     </div>`
  );
}
