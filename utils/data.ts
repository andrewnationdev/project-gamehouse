export const getRandomYear = () => {
  const min = 2016;
  const max = new Date().getFullYear();
  return Math.floor(Math.random() * (max - min + 1)) + min;
};