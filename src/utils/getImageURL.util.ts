/** Функция для получения полного пути к изображению */
export const getImageURL = (fileName: string) => {
  const serverURL = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`;
  return `${serverURL}/images/${fileName}`;
};
