export const createTiledPattern = (imageSrc, grid = 4) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const size = img.width;
      const canvas = document.createElement("canvas");
      canvas.width = size * grid;
      canvas.height = size * grid;

      const ctx = canvas.getContext("2d");

      for (let x = 0; x < grid; x++) {
        for (let y = 0; y < grid; y++) {
          ctx.drawImage(img, x * size, y * size, size, size);
        }
      }

      resolve(canvas.toDataURL("image/png"));
    };
  });
};