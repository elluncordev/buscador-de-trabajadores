/*
El modelo se encargará de gestionar los datos y las operaciones relacionadas con los datos.
En tu caso, esto implicaría la función fetchData y filterData.
*/

const Model = {
  data: [],

  async fetchData(url) {
    try {
      const response = await fetch(url);
      this.data = await response.json();
    } catch (error) {
      console.error(error);
      this.data = [];
    }
  },

  filterData(valueSearch) {
    return this.data.filter((register) =>
      Object.values(register)
        .slice(1, 7)
        .some((v) => this.containsWord(v, valueSearch))
    );
  },

  containsWord(text, valueSearch) {
    const requiredWords = valueSearch
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 0);

    return requiredWords.every((newWord) =>
      text.toLowerCase().includes(newWord)
    );
  },

  getPreferences() {
    return localStorage.getItem('status') || 'disable';
  },

  updatePreferences(preferences) {
    localStorage.setItem('status', preferences);
  },
};

export default Model;
