import "../CSS/style.css";
import { DOMselectors } from "./DOM.js";

async function fetchData() {
  try {
    const response = await fetch(
      "https://dragonball-api.com/api/characters?limit=10000"
    );

    if (response.status !== 200) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    displayCards(data.items); // Render the initial cards
    attachEventListeners(data.items); // Set up event listeners
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Sorry, could not find character");
  }
}

function displayCards(data) {
  clearContainer(); // Clear the container before rendering
  data.forEach((character) => {
    createCard(
      character.image,
      character.race,
      character.name,
      character.affiliation,
      character.ki,
      character.maxKi,

      character.id
    );
  });
}

function createCard(img, race, title, desc, ki, maxKi, id) {
  DOMSelectors.container.className =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center";
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

function attachEventListeners(data) {
  DOMselectors.container.addEventListener("click", (event) => {
    if (event.target.nodeName === "BUTTON") {
      const selectedCharacter = data.find(
        (character) => character.id == event.target.id
      );

      if (selectedCharacter) {
        displayCharacterDetails(selectedCharacter, data);
      }
    }
  });
}

function displayCharacterDetails(character, allData) {
  clearContainer();
  DOMselectors.container2.insertAdjacentHTML(
    "beforeend",
    `<div class="card bg-base-100 w-[500px] h-[600px] shadow-xl flex flex-col justify-between items-center p-6">
  <figure class="flex justify-center h-[300px] w-full overflow-hidden">
    <img src="${character.image}" alt="${character.affiliation}" class="rounded-xl object-contain w-full h-full" />
  </figure>
  <div class="card-body text-center flex-1 flex flex-col justify-center items-center">
    <h2 class="card-title text-2xl mb-4">${character.name}</h2>
    <p class="text-lg mb-4">Race: ${character.race}</p>
    <p class="text-lg mb-4">Affiliation: ${character.affiliation}</p>
    <p class="text-lg mb-4">Ki: ${character.ki}</p>
    <p class="text-lg mb-4">Maxi: ${character.maxKi}</p>
    <div class="card-actions flex justify-center w-full">
      <button class="btn btn-primary w-full" id="back-button">Go Back</button>
    </div>
  </div>
</div>`
  );

  document.getElementById("back-button").addEventListener("click", () => {
    displayCards(allData);
  });
}

function clearContainer() {
  DOMselectors.container.innerHTML = "";
}

fetchData();
