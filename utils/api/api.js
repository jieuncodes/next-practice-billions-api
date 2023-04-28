const BASE_URL = "https://billions-api.nomadcoders.workers.dev/";

export async function getAllBillionaires() {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching billionaires:", error);
    throw error;
  }
}

export async function getBillionaireById(id) {
  try {
    const response = await fetch(`${BASE_URL}person/${id}`);

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching billionaire with ID ${id}:`, error);
    throw error;
  }
}
