export const useTraverseTree = () => {
  const addNewNode = (tree, parentId, newNodeData) => {
    if (tree.id === parentId) {
      tree.items.unshift(newNodeData);
      return tree;
    }

    tree.items = tree.items.map((item) =>
      addNewNode(item, parentId, newNodeData)
    );
    return tree;
  };

  const deleteNode = (tree, id) => {
    if (tree.id === id) {
      return null;
    }
    // tree.items = tree.items
    //   .map((item) => deleteNode(item, id))
    //   .filter((item) => item !== null);
    // return tree;

    // same as above, but it creates new reference
    return {
      ...tree,
      items: tree.items
        .map((item) => deleteNode(item, id))
        .filter((item) => item !== null),
    };
  };

  const editName = (tree, id, updatedName) => {
    if (tree.id === id) {
      tree.name = updatedName;
      return tree;
    }
    tree.items = tree.items.map((item) => editName(item, id, updatedName));
    return tree;
  };

  return { addNewNode, deleteNode, editName };
};
