export type Database = {
  getValue: () => number;
  setValue: (value: number) => void;
  reset: () => void;
};

export class LocalStorageDatabase implements Database {
  private readonly key: string = "hydration-value";

  getValue = (): number => {
    const value = localStorage.getItem(this.key);
    return value ? Number.parseInt(value, 10) : 0;
  };

  setValue = (value: number): void => {
    localStorage.setItem(this.key, value.toString());
  };

  reset = (): void => {
    localStorage.removeItem(this.key);
  };
}

// Factory function to get the current database implementation
export function getDatabase(): Database {
  return new LocalStorageDatabase();
}
