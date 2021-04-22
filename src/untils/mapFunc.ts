export const mapTo = (object1, object2) => {
  Object.keys(object1).forEach((key) => {
    object1[key] = object2[key] || object1[key];
  });
  return object1;
};
