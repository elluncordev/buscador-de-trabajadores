import Model from "./model.js";
import View from "./view.js";

// Define constants
const server = "http://localhost:8080/";
const json = "data/data.json";
const urlConfig = `${server}${json}`;
const maxResults = 7;

// DOMContentLoaded event handler
document.addEventListener("DOMContentLoaded", async () => {
  // Fetch data from the specified URL
  await Model.fetchData(urlConfig);

  // Get DOM elements
  const inputSearchPeople = document.querySelector("#input-search");

  // Add event listeners
  inputSearchPeople.addEventListener("input", handleInputSearch);
  View.resultTable.addEventListener("click", handleBossTableRowClick);
  View.chanceMode.addEventListener("click", toggleDarkMode);

  // Function to handle input search
  let timeoutId;
  function handleInputSearch() {
    clearTimeout(timeoutId);
    const valueSearch = inputSearchPeople.value.trim().toLowerCase();

    if (valueSearch === "") {
      View.hideResultTable();
      View.hideBoosResultTable();
      return;
    }

    timeoutId = setTimeout(() => {
      const filteredData = Model.filterData(valueSearch);
      const headers = Object.keys(filteredData[0]);
      const dataToShow = filteredData.slice(0, maxResults);
      View.renderResultsTable(dataToShow, headers);
    }, 500);
  }

  // Function to handle boss table row click
  function handleBossTableRowClick(event) {
    if (event.target.tagName === "TD") {
      const clickedRow = event.target.parentElement;
      const fifthCellValue = clickedRow.children[7].textContent
        .trim()
        .toLowerCase();
      const filteredData = Model.filterData(fifthCellValue);
      View.renderBoosResultTable(filteredData);
    }
  }

  // Define titles and initialize title cycling
  const titles = ["JEFATURA", "GERENCIA", "DIRECCIÓN"];
  let currentIndex = 0;

  async function cycleTitles() {
    while (true) {
      const currentTitle = titles[currentIndex];
      await View.updateTitle(currentTitle);
      currentIndex = (currentIndex + 1) % titles.length;
      await new Promise((resolve) => setTimeout(resolve, 7000));
    }
  }

  cycleTitles();

  // Function to toggle dark mode
  function toggleDarkMode() {
    const status = Model.getPreferences();
    View.body.classList.toggle("dark-mode-active");
    View.resultTable.classList.toggle("dark-mode-active");
    View.boosTable.classList.toggle("dark-mode-active");
    View.darkModeButton.classList.toggle("disable");
    View.lightModeButton.classList.toggle("disable");

    if (status === "enable") {
      Model.updatePreferences("disable");
    } else {
      Model.updatePreferences("enable");
    }
  }
});

const status = Model.getPreferences();
if (status === "enable") {
  setTimeout(() => {
    View.toggleDarkModeView(true);
  }, 500);
}
