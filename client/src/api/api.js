const addValuesToDB = async (api, api_data) => {
  try {
    const response = await fetch(`http://localhost:5000/${api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: api_data,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok", response);
    }

    const data = await response.json();
    return data.insertId;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const getValuesFromDB = async (api) => {
  try {
    const response = await fetch(`http://localhost:5000/${api}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const deleteValuesFromDB = async (api) => {
  try {
    const response = await fetch(`http://localhost:5000/${api}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok", response);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const updateValuesToDB = async (api, api_data) => {
  try {
    const response = await fetch(`http://localhost:5000/${api}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: api_data,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok", response);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export { addValuesToDB, getValuesFromDB, deleteValuesFromDB, updateValuesToDB };
