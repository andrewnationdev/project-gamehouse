export const truncate = (text:string, maxLength:number = 26):string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};