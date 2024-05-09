export async function GET({fetch}) {
    const response = await fetch("http://localhost:3000/stats");
    const stats = await response.json();
    if (stats.errors) {
        throw new Error(stats.errors);
    }
    return new Response(JSON.stringify(stats));
}
