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
    call2(data);

    data.items.forEach((character) => {
      createcards(
        character.image,
        character.race,
        character.name,
        character.affiliation,
        character.id
      );
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Sorry, could not find character");
  }
}

function createcards(img, race, title, desc, id) {
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
          <button class="btn btn-primary w-full" id="${id}">Learn More</button>
        </div>
      </div>
    </div>`
  );
}

function reset() {
  DOMselectors.container.innerHTML = "";
}

function call2(data) {
  DOMselectors.container.addEventListener("click", (event) => {
    if (event.target.nodeName === "BUTTON") {
      event.preventDefault();
      const apiData = data.items;
      console.log(event.target.id);
      const selectedcharacter = apiData.find(
        (character) => character.id == event.target.id
      );
      console.log("You did it! :D");
      reset();
      DOMselectors.container.insertAdjacentHTML(
        "beforeend",
        `<div class="card bg-base-100 w-96 h-120 shadow-xl flex flex-col justify-between items-center">
          <figure class="flex justify-center h-72 w-full overflow-hidden">
            <img src="${selectedcharacter.image}" alt="${selectedcharacter.affiliation}" class="rounded-xl object-contain w-full h-full" />
          </figure>
          <div class="card-body text-center flex-1 flex flex-col justify-center items-center">
            <h2 class="card-title text-xl mb-4">${selectedcharacter.name}</h2>
            <p class="text-lg mb-4">${selectedcharacter.race}</p>
            <p class="text-lg mb-4">${selectedcharacter.affiliation}</p>
            <div class="card-actions flex justify-center w-full">
            <button class="btn btn-primary w-full">Go Back</button>
            </div>
          </div>
        </div>`
      );
      headBack(apiData);
    }
  });
}

function headBack(data) {
  DOMselectors.container.addEventListener("click", (event) => {
    if (event.target.nodeName === "BUTTON") {
      event.preventDefault();
      console.log(data);
      data.items.forEach((character) => {
        createcards(
          character.image,
          character.race,
          character.name,
          character.affiliation,
          character.id
        );
      });
    }
  });
}

getData();
