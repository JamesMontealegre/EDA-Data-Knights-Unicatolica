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