export const MAX_FILE_SIZE = 15 * 1024 * 1024; // "Limit 15MB per file"

export function createFile(name: string, mimeType: string, sizeInBytes = 20) {
  return { name, mimeType, buffer: Buffer.alloc(sizeInBytes, 'a') };
}

// input-ul  .pdf, .docx, .pptx, .txt, .xlsx
export const UPLOAD_FILES = [
  createFile('first-file.txt', 'text/plain'),
  createFile('second-file.pdf', 'application/pdf'),
];