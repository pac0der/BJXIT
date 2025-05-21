export function decodeToken(token: string): any | null {
    try {
      const payload = atob(token.split('.')[1]);
      return JSON.parse(payload);
    } catch {
      return null;
    }
  }

  