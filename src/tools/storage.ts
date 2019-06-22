/**
 * local, sessionストレージのラッパー
 */
export default {
  local: {
    get: <T>(key: string): T | undefined => {
      if (!localStorage) {
        return undefined;
      }

      const json = localStorage.getItem(key);
      const data = json ? JSON.parse(json) : undefined;
      return data ? data.value : undefined;
    },
    set: <T = any>(key: string, value: T) => {
      if (!localStorage) {
        return undefined;
      }

      localStorage.setItem(
        key,
        JSON.stringify({
          value
        })
      );
    }
  },
  session: {
    get: <T>(key: string): T | undefined => {
      if (!sessionStorage) {
        return undefined;
      }
      const json = sessionStorage.getItem(key);
      const data = json ? JSON.parse(json) : undefined;
      return data ? data.value : undefined;
    },
    set: <T = any>(key: string, value: T) => {
      if (!sessionStorage) {
        return undefined;
      }

      sessionStorage.setItem(
        key,
        JSON.stringify({
          value
        })
      );
    }
  }
};
