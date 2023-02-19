import { Dirent, Stats } from "fs";
import * as fs from "fs/promises";
import * as path from "path";
import { hashItem } from "./Hasher";
import { promptToDelete } from "./Prompter";

const pathToSearch: string = process.argv[2];

if(!pathToSearch) throw new Error('Provide a path to search');

walkThroughDirectories(pathToSearch);

async function isDirectory(item: string): Promise<boolean> {
  try {
    const itemStats: Stats = await fs.stat(item);
    return itemStats.isDirectory();
  } catch (err: unknown) {
    throw err;
  }
}

async function walkThroughDirectories(pathToSearch: string):Promise<void> {
  const mapper: Map<string, boolean> = new Map();

  try {
    const items: Dirent[] = await fs.readdir(pathToSearch, { withFileTypes: true });
    
    for(const item of items) {
      const itemPath = path.join(pathToSearch, item.name);
      if(await isDirectory(itemPath)) {
        walkThroughDirectories(itemPath);
      }
      else {
        const hash = await hashItem(itemPath);
        if(mapper.get(hash)) await promptToDelete(itemPath);
        else mapper.set(hash, true);
      }
    }

  } catch (err: unknown) {
    throw err;    
  }

}
