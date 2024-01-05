const openModal = document.querySelector(".open-modal");
const modal = document.querySelector(".modal");
const addApplication = document.querySelector(".add-application");
const applicationContainer = document.querySelector(".application-container");
const applicationDetailForm = document.querySelector("#aplication-detail-form");

let data = JSON.parse(localStorage.getItem("userApplications"));
const statusColors = {
  applying: {
    text: "#4522A9",
    bg: "#E7DFFF",
  },

  offered: {
    text: "#EDFFEA",
    bg: "#165E3D",
  },
  rejected: {
    text: "#EB5757",
    bg: "#FFE5E5",
  },
  submitted: {
    text: "#165E3D",
    bg: "#EDFFEA",
  },
};
const displayData = function () {
  const details = JSON.parse(localStorage.getItem("userApplications"));
  const htmlMarkup = details.reduce((acc, curr) => {
    const { companyName, position, status, jobLink, date, location } = curr;
    const { text, bg } = statusColors[status];

    const html = `<div
                class="flex flex-row p-3 mt-2 justify-items-center gap-6 bg-white items-center font-medium"
              >
                <div class="text-center break-all w-[19.29%]">${companyName}</div>
                <div class="text-center break-all w-[19.29%]">
                  ${position}
                </div>
                <div
                  class="capitalize text-center break-all w-[9.29%] text-sm rounded py-1"
                  style="background-color:${bg};color:${text};"
                >
                  ${status}
                </div>
                <div class="text-center break-all w-[20.29%]"><a href="${jobLink}"><i class="fa fa-external-link pr-2" aria-hidden="true"></i> ${jobLink}</a></div>
                <div class="text-center break-all w-[14.29%]">${location}</div>
                <div class="text-center break-all w-[14.29%]">${date}</div>
                <div class="text-center break-all w-[4.29%]">
                 <button data-id="${curr.id}" class="delete-btn">
                 <i class="fa fa-trash"></i>
                 </button> 
                </div>
              </div>`;
    return acc + html;
  }, "");
  applicationContainer.innerHTML = htmlMarkup;
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itemId = btn.dataset.id;
      data = data.filter((d) => d.id !== itemId);
      localStorage.setItem("userApplications", JSON.stringify(data));
      displayData();
    });
  });
};

openModal.addEventListener("click", function () {
  modal.classList.remove("hidden");
});

applicationDetailForm.addEventListener("submit", (form) => {
  form.preventDefault();
  const formData = new FormData(form.target);
  const newData = {};
  for (const [key, value] of formData) {
    // console.log(`${key}: ${value}`);
    newData[key] = value;
  }
  modal.classList.add("hidden");
  data.push({
    id: crypto.randomUUID(),
    ...newData,
  });
  localStorage.setItem("userApplications", JSON.stringify(data));
  form.target.reset();

  displayData();
});
displayData();
