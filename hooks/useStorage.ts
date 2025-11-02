export interface UseStorageProps {
  key: string;
}

export function useStorage<T>({ key }: UseStorageProps) {
  function getAll(): T {
    const str = localStorage.getItem(key);

    return JSON.parse(str ?? "[]") as T;
  }

  function set(data: T) {
    const str = JSON.stringify(data);
    localStorage.setItem(key, str);
  }

  return { getAll, set };
}
