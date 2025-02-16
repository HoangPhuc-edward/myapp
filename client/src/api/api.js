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

const getRoleByEmail = async (email) => {
  fetch(`http://localhost:5000/accounts/role/"${email}"`)
    .then((response) => response.json())
    .then((data) => {
      return data[0].MaVaiTro;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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

export { addValuesToDB, getRoleByEmail, getValuesFromDB };
