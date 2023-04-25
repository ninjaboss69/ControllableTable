import { TREE_ACTIONS_TYPE } from "./tree-actions";
import { v4 as uuid } from "uuid";

const INITIAL_STATE = {
  tree_data: {},
};

export const addNewNode = (id, nodeToAdd, state) => {
  const tree_data = state.tree_data;
  if (Object.keys(tree_data).length === 0) {
    // Only Happen at first stage, where original chart is empty {}

    state.tree_data = { ...nodeToAdd };
    return;
  }
  const parentNode = dfs(id, tree_data);
  if (parentNode == null) {
    tree_data.children.push(nodeToAdd);

    return;
  }

  parentNode.children?.push(nodeToAdd);
};

export const bfsToDelete = (id, currentNode) => {
  if (!currentNode) {
    return;
  }
  if (currentNode.id === id) {
    return "Delete";
  }
  const deleteArray = [];
  for (let i = 0; i < currentNode.children?.length; i++) {
    const tt = bfsToDelete(id, currentNode.children[i]);
    if (tt === "Delete") {
      continue;
    }
    deleteArray.push(currentNode.children[i]);
  }
  currentNode.children = [...deleteArray];
};

export const deleteNode = (id, state) => {
  const tree_data = state.tree_data;
  bfsToDelete(id, tree_data);
};

export const dfs = (idToFind, currentNode) => {
  if (currentNode == null) return null;

  if (currentNode.id === idToFind) {
    return currentNode;
  }
  if (currentNode.children?.length >= 1) {
    for (let i = 0; i < currentNode.children.length; i++) {
      const res = dfs(idToFind, currentNode.children[i]);

      // Terminating the process when the required node is found

      if (res !== null) return res;
    }
  }
  return null;
};

export const treeReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case TREE_ACTIONS_TYPE.SET_TREE: {
      return { ...state, tree_data: payload };
    }

    case TREE_ACTIONS_TYPE.ADD_NEW_NODE: {
      const id = payload.parentNode.id;

      addNewNode(
        id,
        { id: uuid(), name: payload.nodeToAdd.name, children: [] },
        state
      );
      return { ...state, tree_data: { ...state.tree_data } };
    }

    case TREE_ACTIONS_TYPE.DELETE_NEW_NODE: {
      // Deleting The Most Parent Node
      if (
        payload === state.tree_data.id ||
        payload === "undefined ( id : undefined)"
      ) {
        return { ...state, tree_data: {} };
      }
      // Other Cases
      deleteNode(payload, state);

      return { ...state, tree_data: { ...state.tree_data } };
    }

    default:
      return state;
  }
};
