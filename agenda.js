insertByFirstLetter(newNode) {
    if (this.head === null) {
       
        this.head = newNode;
        this.tail = newNode;
        newNode.next = null;
        newNode.previous = null;
    } else {
        let currentNode = this.head;

        while (currentNode !== null && currentNode.nombre[0] < newNode.apellido[0]) {
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