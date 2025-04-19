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
function renderTable(data) {
  $("#tableBody").html(
    data
      .map(
        (c) => `
      <tr>
        <td class="py-2 px-4 border-b">${c.telefono}</td>
        <td class="py-2 px-4 border-b">${c.firstName}</td>
        <td class="py-2 px-4 border-b">${c.lastName}</td>
      </tr>
    `
      )
      .join("")
  );
}

$("#addBtn").click(() => {
  const telefono = $("#indexInput").val().trim();
  const first = $("#valueInput").val().trim();
  const last = $("#apellidoInput").val().trim();

  if (!telefono || !first || !last) return alert("Completa todos los campos.");

  agenda.insertByFirstLetter(new doubleLinkedListNode(first, last, telefono));
  saveToLocalStorage();
  renderTable(toArray());
  $("#indexInput, #valueInput, #apellidoInput").val("");
});

$("#searchBtn").click(() => {
  const l = prompt("Letra para buscar:")?.trim().toUpperCase();
  if (!l) return;
  renderTable(agenda.searchByFirstLetter(l));
});

$('#deleteBtn').click(() => {
    const l = prompt("Letra para eliminar:")?.trim().toUpperCase();
    if (!l) return;
    if (!confirm(Eliminar contactos que empiecen con "${l}"?)) return;
    agenda.deleteByFirstLetter(l);
    saveToLocalStorage();
    renderTable(toArray());
  });
