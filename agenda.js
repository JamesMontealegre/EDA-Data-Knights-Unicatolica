class doubleLinkedListNode {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.next = null;
    this.previous = null;
  }
}

class doubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
}
