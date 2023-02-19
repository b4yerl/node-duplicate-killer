import * as fs from "fs/promises";
import { createHash } from "crypto";

export async function hashItem(item: string): Promise<string> {
  const readItem: Buffer = await fs.readFile(item);

  const hash: string = createHash('sha256').update(readItem).digest('hex');

  return hash;
}