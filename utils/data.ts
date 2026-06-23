export const getRandomYear = () => {
  const min = 2016;
  const max = new Date().getFullYear();
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const calculateGamePrice = (releasedDate: string | null): number => {
  const currentYear = new Date().getFullYear();
  const releaseYear = releasedDate ? new Date(releasedDate).getFullYear() : currentYear;
  const yearsPassed = currentYear - releaseYear;
  const finalPrice = Math.max(19.90, 499 - (21.39 * yearsPassed));
  return finalPrice;
};