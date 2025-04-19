class doubleLinkedListNode {
  constructor(firstName, lastName, telefono) {
    this.telefono = telefono;
    this.firstName = firstName;
    this.lastName = lastName;
    this.next = null;
    this.previous = null;
  }
}
class doubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  searchByFirstLetter(targetLetter) {
    let currentNode = this.head;
    let foundNodes = [];
    
    while (currentNode !== null) {
        const firstInitial = currentNode.firstName[0];
        const lastInitial = currentNode.lastName[0];
        
        if (firstInitial === targetLetter || lastInitial === targetLetter) {
            
            foundNodes.push(currentNode);
        }
        
        currentNode = currentNode.next;
    }
    return foundNodes; 
  }
  insertByFirstLetter(newNode) {
    if (this.head === null) {
      
        this.head = newNode;
        this.tail = newNode;
        newNode.next = null;
        newNode.previous = null;
    } else {
        let currentNode = this.head;

        while (currentNode !== null && currentNode.firstName[0] < newNode.lastName[0]) {
            currentNode = currentNode.next;
        }

        if (currentNode === null) {
            
            this.tail.next = newNode;
            newNode.previous = this.tail;
            newNode.next = null;
            this.tail = newNode;
        } else if (currentNode === this.head) {
            
            newNode.next = this.head;
            this.head.previous = newNode;
            newNode.previous = null;
            this.head = newNode;
        } else {
            
            let previousNode = currentNode.previous;
            previousNode.next = newNode;
            newNode.previous = previousNode;
            newNode.next = currentNode;
            currentNode.previous = newNode;
        }
    }
  }
  deleteByFirstLetter(letter) {
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.firstName[0] === letter) {
        const nodeToDelete = currentNode;

        if (nodeToDelete === this.head && nodeToDelete === this.tail) {
          this.head = null;
          this.tail = null;
        } else if (nodeToDelete === this.head) {
          this.head = nodeToDelete.next;
          if (this.head) this.head.previous = null;
        } else if (nodeToDelete === this.tail) {
          this.tail = nodeToDelete.previous;
          if (this.tail) this.tail.next = null;
        } else {
          nodeToDelete.previous.next = nodeToDelete.next;
          nodeToDelete.next.previous = nodeToDelete.previous;
        }
      }

      currentNode = currentNode.next;
    }
  }
}
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
    if (!confirm(`Eliminar contactos que empiecen con "${l}"?`)) return;
    agenda.deleteByFirstLetter(l);
    saveToLocalStorage();
    renderTable(toArray());
  });
