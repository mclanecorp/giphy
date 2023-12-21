// Importer les modales
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);

function toggleModal() {
  modalContainer.classList.toggle("active");
}

const input_tache = document.getElementById("input_tache");
const btn_ajouter = document.getElementById("btn_ajouter");
let important = 0;

btn_ajouter.addEventListener("click", () => {
  event.preventDefault();
  console.log("ok");
  ajouter_tache();
});
//ajouter une tache
function ajouter_tache() {
  const tache = input_tache.value;
  const selectElement = document.getElementById("priority");
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const selectedText = selectedOption.text;
  const input_date = document.getElementById("date");
  const date = input_date.value;

  if (tache) {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `
    <div class="form-check">
      <input type="checkbox" name="checked" id="checked" class="checked"/>
      <span>${tache}</span>
    </div>
    <div class="priority">
      <p class="text_date">${date}</p>
      <span>${selectedText}</span>
    </div>
    `;
    const list = document.getElementById("liste_taches");
    list.appendChild(li);
    input_tache.value = "";

    //compteur de tache importante
    const nbr_important = document.getElementById("nbr_important");
    if (selectedText === "hight") {
      important = important + 1;
      li.classList.add("hight");
      nbr_important.innerHTML = important;
    } else {
      li.classList.add("low");
    }

    // Ajouter un gestionnaire d'événements "click" à la checkbox
    const checkbox = li.querySelector(".checked");
    checkbox.addEventListener("click", () => {
      list.removeChild(li);
      if (li.classList.contains("hight")) {
        important = important - 1;
        nbr_important.innerHTML = important;
        if (important === 0) {
          nbr_important.innerHTML = "";
        }
      }
    });
  }
}

const day = document.getElementById("day");
const date = new Date();
const options = { weekday: "long", day: "numeric", month: "long" };
console.log(date.toLocaleDateString("en-US", options));
const presentDay = date.toLocaleDateString("fr-FR", options);
day.innerHTML = presentDay;

// Compte à rebours
const liens_pomodoro = document.getElementById("liens_pomodoro");
liens_pomodoro.addEventListener("click", () => {
  event.preventDefault();
  let compteur = 120;

  const intervalId = setInterval(() => {
    const minutes = Math.floor(compteur / 60);
    const secondes = compteur % 60;
    const timer = document.getElementById("timer");

    timer.innerHTML = `${minutes}m ${secondes}s`;
    console.log(`${minutes}m ${secondes}s`);
    compteur--;

    if (compteur < 0) {
      clearInterval(intervalId);
      timer.innerHTML = "Terminé";
    }
  }, 1000);
});

//important
const btn_important = document.getElementById("important");
const title = document.getElementById("title");

btn_important.addEventListener("click", (event) => {
  const task_important = document.querySelectorAll(".hight");
  const task_low = document.querySelectorAll(".low");
  day.style.display = "none";
  title.innerHTML = "Important";
  event.preventDefault();
  task_important.forEach((task) => {
    task.classList.add("visible");
  });
  task_low.forEach((task) => {
    task.style.display = "none";
  });
  console.log("ok");
});
//today
const btn_today = document.getElementById("today");

btn_today.addEventListener("click", (event) => {
  event.preventDefault();
  day.style.display = "block";
  title.innerHTML = "Today";
  const task_low = document.querySelectorAll(".low");
  task_low.forEach((task) => {
    task.style.display = "flex";
  });
});
