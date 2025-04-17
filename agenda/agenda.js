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