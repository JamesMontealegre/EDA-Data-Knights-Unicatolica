const agenda = new doubleLinkedList();

// Cargar desde localStorage al iniciar
$(document).ready(() => {
  const data = JSON.parse(localStorage.getItem("agenda")) || [];
  data.forEach(({ firstName, lastName, telefono }) => {
    const node = new doubleLinkedListNode(firstName, lastName, telefono);
    agenda.insertByFirstLetter(node);
  });
  renderTable(toArray());
});
