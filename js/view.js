/*
La vista se encargará de manejar la interfaz de usuario.
Esto incluirá funciones para mostrar, ocultar y renderizar tablas.
*/

const View = {

  resultTable: document.querySelector(".table--search-result"),
  boosTable: document.querySelector(".table--result-boss"),
  changingTitle: document.querySelector(".main--title-chance"),

  chanceMode: document.querySelector(".main--mode"),
  darkModeButton: document.querySelector(".button-dark-mode"),
  lightModeButton: document.querySelector(".button-light-mode"),
  body: document.body,

  clearTable(tableElement) {
    tableElement.innerHTML = "";
  },

  showTable(tableElement) {
    tableElement.classList.remove("disable");
    tableElement.classList.add("enable");
  },

  hideTable(tableElement) {
    tableElement.classList.remove("enable");
    tableElement.classList.add("disable");
  },

  hideResultTable() {
    this.resultTable.classList.remove("enable");
    this.resultTable.classList.add("disable");
  },

  hideBoosResultTable() {
    this.boosTable.classList.remove("enable");
    this.boosTable.classList.add("disable");
  },

  renderTable(tableElement, dataToShow, headers) {
    this.clearTable(tableElement);

    if (dataToShow.length > 0) {
      this.showTable(tableElement);
      const headerRow = document.createElement("tr");

      headers.forEach((header) => {
        const th = document.createElement("th");
        th.innerText = header;
        headerRow.appendChild(th);
      });

      tableElement.appendChild(headerRow);

      dataToShow.forEach((record) => {
        const row = document.createElement("tbody");
        headers.forEach((header) => {
          const cell = document.createElement("td");
          cell.innerText = record[header];
          row.appendChild(cell);
        });

        tableElement.appendChild(row);
      });
    } else {
      this.hideTable(tableElement);
    }
  },

  renderResultsTable(dataToShow, headers) {
    this.renderTable(this.resultTable, dataToShow, headers);
  },

  renderBoosResultTable(data) {
    this.renderTable(this.boosTable, data, Object.keys(data[0]));
  },

  updateTitle(newTitle) {
    this.changingTitle.textContent = newTitle;
  },

  toggleDarkModeView(enableDarkMode) {
    if (enableDarkMode) {
      this.body.classList.add('dark-mode-active');
      this.resultTable.classList.add('dark-mode-active');
      this.boosTable.classList.add('dark-mode-active');
      this.darkModeButton.classList.add('disable');
      this.lightModeButton.classList.remove('disable');
    } else {
      this.body.classList.remove('dark-mode-active');
      this.resultTable.classList.remove('dark-mode-active');
      this.boosTable.classList.remove('dark-mode-active');
      this.darkModeButton.classList.remove('disable');
      this.lightModeButton.classList.add('disable');
    }
  }
};

export default View;
