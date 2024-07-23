export async function load({ fetch, params }) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${baseUrl}/chat?coin=${params.slug}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch conversation for coin: ${params.slug}`);
  }
  const conversation = await response.json();
  return conversation;
}

/** @type {import('./$types').Actions} */
export const actions = {
  completion: async ({ fetch, request }) => {
    try {
      const data = await request.formData();
      const userInput = data.get("userInput");
      const coin = data.get("coin");
      const conversationId = data.get("conversationId");
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(
        `${baseUrl}/chat?coin=${coin}&conversationId=${conversationId}`,
      );
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
