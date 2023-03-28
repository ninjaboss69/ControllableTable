export const findIndexFromObject = (array, id) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      return i;
    }
  }
  return -1;
};

export const getObjFromID = (id, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      return { ...array[i] };
    }
  }
  return {};
};
