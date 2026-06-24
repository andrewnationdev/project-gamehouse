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

export function parsePcSpecs(requirementsString: string | undefined | null): string[] | string {
  if (!requirementsString) return "Não informado";

  const regex = /Minimum:|Processor:|Memory:|Graphics:|Storage:|Additional Notes:/gi;

  const specsArray = requirementsString
    .split(regex)
    .map(item => item.trim())
    .filter(item => item.length > 0);

  return specsArray.length > 0 ? specsArray : "Não informado";
}