class AccountApi {
  static async getRoleByEmail(email) {
    try {
      const response = await fetch(
        `http://localhost:5000/accounts/role/${email}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data[0].MaVaiTro;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  static async addAccount(Email, MaVaiTro) {
    try {
      const response = await fetch("http://localhost:5000/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: Email,
          MaVaiTro: MaVaiTro,
        }),
      });

      if (!response.ok) {
        throw new Error(response);
      }
      const data = await response.json();
      return data.insertId;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

export default AccountApi;
