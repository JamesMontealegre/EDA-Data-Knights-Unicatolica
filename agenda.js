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
}
