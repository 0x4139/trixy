export async function GET({ fetch }) {
  const response = await fetch("http://localhost:3000/communityMessages");
  const communityMessagesStats = await response.json();
  if (communityMessagesStats.errors) {
    throw new Error(communityMessagesStats.errors);
  }
  return new Response(JSON.stringify(communityMessagesStats));
}
