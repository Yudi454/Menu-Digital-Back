import multer from "multer"

console.log("pase por multer");

export const upload = multer({storage: multer.memoryStorage()})