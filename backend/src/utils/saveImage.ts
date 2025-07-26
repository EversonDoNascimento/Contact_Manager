import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { MultipartFile } from "@fastify/multipart";

export const saveImage = async (file: MultipartFile) => {
  const fileName = `${Date.now()}_${file.filename}`;
  const filePath = path.join(__dirname, "..", "..", "uploads", fileName);

  // Cria o diretório se não existir
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Salva o arquivo usando stream
  await pipeline(file.file, fs.createWriteStream(filePath));

  return filePath;
};
