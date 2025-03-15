class TokenService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "http://localhost:58257";
  }

  async createToken(
    ttlInSeconds = 3600,
    username = "f7a89cb0-8eb4-405b-8275-ced51e387408"
  ) {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/token?username=${encodeURIComponent(username)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Token creation failed:", error);
      throw error;
    }
  }
}
