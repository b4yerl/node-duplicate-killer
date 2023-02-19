import { unlink } from "fs/promises";
import promptSync from "prompt-sync";

const prompt = promptSync();

export async function promptToDelete(path: string): Promise<void> {
  let result: string = prompt(`Do you wish to delete: ${path}? (Y/n)`);
  
  // Checking if user wants do delete file then do it or return.
  if(result.toLowerCase() === 'n') return;
  else await unlink(path);

  return;
}