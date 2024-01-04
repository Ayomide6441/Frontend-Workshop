const openModal = document.querySelector(".open-modal");
const modal = document.querySelector(".modal");
const addApplication = document.querySelector(".add-application");
const applicationContainer = document.querySelector(".application-container");

let data = [];
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

const displayData = function (data) {
  const htmlMarkup = data.reduce((acc, curr) => {
    const { companyName, position, status, jobLink, date, location } = curr;
    const { text, bg } = statusColors[status];

    const html = `<div
                class="flex flex-row p-3 justify-items-center gap-6 bg-white items-center mt-2 font-medium"
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
                <div class="text-center break-all w-[20.29%]">${jobLink}</div>
                <div class="text-center break-all w-[14.29%]">${location}</div>
                <div class="text-center break-all w-[14.29%]">${date}</div>
                <div class="text-center break-all w-[4.29%]">
                  <i class="fa fa-trash"></i>
                </div>
              </div>`;
    return acc + html;
  }, "");
  applicationContainer.innerHTML = htmlMarkup;
};

openModal.addEventListener("click", function () {
  modal.classList.remove("hidden");
});
addApplication.addEventListener("click", function () {
  const companyName = document.querySelector("#companyname").value;
  const position = document.querySelector("#position").value;
  const status = document.querySelector("#status").value;
  const jobLink = document.querySelector("#job").value;
  const date = document.querySelector("#date").value;
  const location = document.querySelector("#location").value;
  console.log(companyName, position, status, jobLink, date, location);
  modal.classList.add("hidden");
  data.push({
    id: crypto.randomUUID(),
    companyName,
    position,
    status,
    jobLink,
    date,
    location,
  });
  displayData(data);
});
