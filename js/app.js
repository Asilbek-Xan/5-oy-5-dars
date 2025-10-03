import { elContainer, elForm, elLoader, elTemplateCard } from "./html-selection.js";
import { toast } from "./toast.js";



function ui(cars) {
  elContainer.innerHTML = "";
  cars.forEach(element => {
    const clone = elTemplateCard.cloneNode(true).content;
    const elTitle = clone.querySelector("h2");
    const elDescription = clone.querySelector("p");
    const elDeleteButton = clone.querySelector(".js-delete");

    // Content
    elTitle.innerText = element.name;
    elDescription.innerText = element.description;
    elDeleteButton.id = element.id;



    elContainer.appendChild(clone);
  });
}



function init() {
  elLoader.style.display = "block";
  fetch("https://json-api.uz/api/project/fn43/cars")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      ui(res.data);
    })
    .catch(() => {})
    .finally(() => {
        elLoader.style.display = "none";



    });
}




function deleteCar(id) {
  fetch(`https://json-api.uz/api/project/fn43/cars/${id}`, {
    method: 'DELETE',
  })
   .then((res) => {
  if (!res.ok) throw new Error("Server xatosi");
  return res.text();
})
.then((res) => {
  toast("Mashina o'chirildi ✅");
  elContainer.innerHTML = "";
  init();
})

}

function addCar(car){
   fetch(`https://json-api.uz/api/project/fn43/cars/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(car),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {

      elContainer.innerHTML = "";
      init();
    })
    .catch(() => {
      // console.log(err.message);

      alert("Xatolik bo'ldi ⚠️")
    })
    .finally(() => {
        elLoader.style.display = "none";

    });
}


init();



// CRUD - Create, Read, Update, Delete
elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(elForm);
  const result = {};

  formData.forEach((value, key) => {
  result[key] = value;
});

addCar(result);

});


elContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("js-delete")) {
    if (confirm("Qo'lingiz tegib ketmadimi, yoki Rostdan ham o'chirmoqchimisiz?")) {
      e.target.innerText = "Loading . . .";
    deleteCar(e.target.id);
    }
  }
});

