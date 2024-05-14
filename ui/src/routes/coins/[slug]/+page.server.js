/** @type {import('./$types').Actions} */
export const actions = {
  completion: async ({ fetch, request }) => {
    try {
      const data = await request.formData();
      const userInput = data.get("userInput");
      const coin = data.get("coin");
      const response = await fetch(`http://localhost:3000/chat?coin=${coin}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch conversation for coin: ${coin}`);
      }
      const conversation = await response.json();
      console.log(userInput, coin, conversation);
      return conversation;
    } catch (error) {
      console.error("Error in completion action:", error);
      return { success: false, error: error.message };
    }
  },
};
