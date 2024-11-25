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
      createcards(
        character.image,
        character.race,
        character.name,
        character.affiliation
      );
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Sorry, could not find character");
  }
}

getData();
function createcards(img, race, title, desc) {
  DOMselectors.container.insertAdjacentHTML(
    "beforeend",
    `<div class="card bg-base-100 w-96 h-120 shadow-xl flex flex-col justify-between items-center">
      <figure class="flex justify-center h-72 w-full overflow-hidden">
        <img src="${img}" alt="${desc}" class="rounded-xl object-contain w-full h-full" />
      </figure>
      <div class="card-body text-center flex-1 flex flex-col justify-center items-center">
        <h2 class="card-title text-xl mb-4">${title}</h2>
        <p class="text-lg mb-4">${race}</p>
        <p class="text-lg mb-4">${desc}</p>
        <div class="card-actions flex justify-center w-full">
          <button class="btn btn-primary w-full" id="learn">Learn More</button>
        </div>
      </div>
    </div>`
  );
}

const learnmorebutton = DOMselectors.learnmore;
function call2() {
  learnmorebutton.addEventListener("click", (event) => {
    event.preventDefault();
  });
}
