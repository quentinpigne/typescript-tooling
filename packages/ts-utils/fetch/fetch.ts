export async function getJsonData<T>(url: string): Promise<T> {
  const response: Response = await fetch(url);
  return response.json();
}

export async function postJsonData<T>(url: string, data: T): Promise<void> {
  await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
