export const truncate = (text:string, maxLength:number = 23):string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};