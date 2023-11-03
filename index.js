var title = document.getElementById("title");
var sDate = document.getElementById("s-date");
var eDate = document.getElementById("e-date");
var desri = document.getElementById("descr");
var addBtn = document.getElementById("add-btn");
var preioCheck = document.querySelector('input[type="checkbox"]');
var refreshBtn = document.getElementById("refresh-btn");
var taskContainer = document.getElementById("containerTask");
var errorD = document.getElementById("errorD");

var checkDate = () => {
  var startDate = new Date(sDate.value);
  var endDate = new Date(eDate.value);

  if (startDate > endDate) {
    errorD.textContent =
      "The end date must be greater than or equal to the start date.";
    errorD.classList.add("dateError");
    return true;
  }
};

var inputsFilled = () => {
  return (
    title.value.trim() !== "" &&
    desri.value.trim() !== "" &&
    sDate.value.trim() !== "" &&
    eDate.value.trim() !== ""
  );
};

var checkInputs = () => {
  if (inputsFilled()) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

title.addEventListener("input", checkInputs);
desri.addEventListener("input", checkInputs);
sDate.addEventListener("input", checkInputs);
eDate.addEventListener("input", checkInputs);

// clear button
var clear = () => {
  title.value = "";
  desri.value = "";
  sDate.value = "";
  eDate.value = "";
  preioCheck.checked = false;

  checkInputs();
};
refreshBtn.addEventListener("click", clear);
checkDate();
//add button
addBtn.addEventListener("click", () => {
  if (!checkDate()) {
    //create star (Priority)
    var starContainer = document.createElement("div");
    var star = document.createElement("i");
    star.classList.add("fa", "fa-star", "fa-regular");
    star.style.color = "#ffffff";
    starContainer.appendChild(star);
    starContainer.style.marginTop = "32px";
    starContainer.style.marginLeft = "26px";

    if (preioCheck.checked) {
      star.style.color = "#FCE834";
    }

    // Create a div for tasks buttons
    const tasksBtns = document.createElement("div");
    tasksBtns.classList.add("tasks-btns");

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    // Create the important-items div
    const importantItemsDiv = document.createElement("div");
    importantItemsDiv.classList.add("important-items");

    // Create Title
    const titleP = document.createElement("p");
    const titleValue = document.createElement("span");
    titleP.textContent = "Title:";
    titleValue.textContent = title.value;
    titleValue.style.cssText = `color: black; margin-left: 30px`;
    titleP.appendChild(titleValue);
    importantItemsDiv.appendChild(titleP);

    // Create Start Date"
    const startDateP = document.createElement("p");
    const startDateValue = document.createElement("span");
    startDateP.innerHTML = "Start Date:";
    startDateValue.innerHTML = sDate.value;
    startDateValue.style.cssText = `color: black;margin-left: 8px`;
    startDateP.appendChild(startDateValue);
    importantItemsDiv.appendChild(startDateP);

    // Create End Date
    const endDateP = document.createElement("p");
    const endDateValue = document.createElement("span");
    endDateP.innerHTML = "End Date:";
    endDateValue.innerHTML = sDate.value;
    endDateValue.style.cssText = `color: black;margin-left: 12px`;
    endDateP.appendChild(endDateValue);
    importantItemsDiv.appendChild(endDateP);

    // Create "Description" text
    const descriP = document.createElement("p");
    const descripValue = document.createElement("span");
    descriP.textContent = "Description:";
    descripValue.textContent = desri.value;
    descripValue.style.cssText = `color: black ; margin-left: 3px`;
    descriP.appendChild(descripValue);
    importantItemsDiv.appendChild(descriP);

    // Append Title,Description, Start Date, and End Date to the important-items" div
    importantItemsDiv.appendChild(titleP);
    importantItemsDiv.appendChild(startDateP);
    importantItemsDiv.appendChild(endDateP);
    importantItemsDiv.appendChild(descriP);

    // Create the Done button
    const validButton = document.createElement("button");
    validButton.classList.add("validB");
    const validIcon = document.createElement("i");
    validIcon.classList.add("fa-solid", "fa-check");
    validIcon.style.color = "#000000";
    validButton.appendChild(validIcon);

    // Create the "Edit" button
    const editButton = document.createElement("button");
    editButton.classList.add("editB");
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-regular", "fa-pen-to-square");
    editIcon.style.color = "#000000";
    editButton.appendChild(editIcon);

    // Create the "Remove" button
    const removeButton = document.createElement("button");
    removeButton.classList.add("removeB");
    const removeIcon = document.createElement("i");
    removeIcon.classList.add("fa-solid", "fa-xmark");
    removeIcon.style.color = "#000000";
    removeButton.appendChild(removeIcon);

    // Append all the elements to the appropriate containers
    importantItemsDiv.appendChild(titleP);
    importantItemsDiv.appendChild(startDateP);
    importantItemsDiv.appendChild(endDateP);
    importantItemsDiv.appendChild(descriP);

    taskDiv.appendChild(importantItemsDiv);

    tasksBtns.appendChild(starContainer);
    tasksBtns.appendChild(taskDiv);
    tasksBtns.appendChild(validButton);
    tasksBtns.appendChild(editButton);
    tasksBtns.appendChild(removeButton);
    taskContainer.appendChild(tasksBtns);
    taskContainer.insertBefore(tasksBtns, taskContainer.firstChild);

    //close button
    removeButton.addEventListener("click", () => {
      // Add a CSS class to apply the fade-out animation
      tasksBtns.classList.add("fade-out");
      // After the animation is complete, remove the element
      tasksBtns.addEventListener("transitionend", () => {
        tasksBtns.remove();
      });
    });
    //edit button
    editButton.addEventListener("click", () => {
      if (!checkDate()) {
        const newTitle = document.getElementById("title");
        const newDescrip = document.getElementById("descr");
        const newSDate = document.getElementById("s-date");
        const newEDate = document.getElementById("e-date");

        titleValue.textContent = newTitle.value;
        titleValue.style.cssText = `color: black; margin-left: 30px`;

        descripValue.textContent = newDescrip.value;
        descripValue.style.cssText = `color: black ; margin-left: 3px`;

        startDateValue.innerHTML = newSDate.value;
        startDateValue.style.cssText = `color: black;margin-left: 8px`;

        endDateValue.innerHTML = newEDate.value;
        endDateValue.style.cssText = `color: black;margin-left: 12px`;
        if (preioCheck.checked) {
          star.style.color = "#FCE834";
        } else {
          star.style.color = "#ffffff";
        }
      }
    });

    //done button
    validButton.addEventListener("click", () => {
      tasksBtns.classList.add("changeOpacity");
      taskContainer.appendChild(tasksBtns);
    });
  }
});
