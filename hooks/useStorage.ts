export interface UseStorageProps {
  key: string;
}

export function useStorage<T>({ key }: UseStorageProps) {
  function getAll(): T | undefined {
    const str = localStorage.getItem(key);
    if (str)
    {
      return JSON.parse(str) as T;
    }
    return undefined;
  }

  function set(data: T) {
    const str = JSON.stringify(data);
    localStorage.setItem(key, str);
  }

  return { getAll, set };
}
