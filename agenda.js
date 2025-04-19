const agenda = new doubleLinkedList();

$(document).ready(() => {
  const data = JSON.parse(localStorage.getItem("agenda")) || [];
  data.forEach(({ firstName, lastName, telefono }) => {
    const node = new doubleLinkedListNode(firstName, lastName, telefono);
    agenda.insertByFirstLetter(node);
  });
  renderTable(toArray());
});
function saveToLocalStorage() {
  const array = toArray().map(({ firstName, lastName, telefono }) => ({
    firstName,
    lastName,
    telefono,
  }));
  localStorage.setItem("agenda", JSON.stringify(array));
}
function toArray() {
  let arr = [],
    current = agenda.head;
  while (current) arr.push(current), (current = current.next);
  return arr;
}
