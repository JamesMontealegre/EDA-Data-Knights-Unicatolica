class doubleLinkedListNode {
  constructor(nombre, apellido, telefono) {
    this.telefono = telefono;
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
}
