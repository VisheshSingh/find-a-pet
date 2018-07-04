import fetchJsonp from "fetch-jsonp";

const petForm = document.querySelector("#pet-form");

petForm.addEventListener("submit", fetchAnimals);

//Fetch Animal From API
function fetchAnimals(e) {
  e.preventDefault();

  //Get User Input
  const animal = document.querySelector("#animal").value;
  const zip = document.querySelector("#zip").value;

  // Fetch Pets
  fetchJsonp(
    `http://api.petfinder.com/pet.find?format=json&key=64719e072566097abd5e913c810e3364&animal=${animal}&location=${zip}&callback=callback`,
    {
      jsonpCallbackFunction: "callback"
    }
  )
    .then(res => res.json())
    .then(data => showAnimals(data.petfinder.pets.pet))
    .catch(err => console.log(err));
}

// SHow listings of pets
function showAnimals(pets) {
  const results = document.querySelector("#results");

  //clear first
  results.innerHTML = "";
  //Loop thru pets
  pets.forEach(pet => {
    const div = document.createElement("div");
    div.classList.add("card", "card-body", "mb-3");
    div.innerHTML = `
        <div class="row">
            <div class="col-sm-6">
                <h4>${pet.name.$t} (${pet.age.$t})</h4>
            </div>
            <div class="col-sm-6">

            </div>
        </div>
      `;

    results.appendChild(div);
  });
}
