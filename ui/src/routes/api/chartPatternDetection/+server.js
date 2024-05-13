export async function GET({fetch}) {
    const response = await fetch("http://localhost:3000/chartPatternDetection");
    const chartPatternDetection = await response.json();
    if (chartPatternDetection.errors) {
        throw new Error(chartPatternDetection.errors);
    }
    return new Response(JSON.stringify(chartPatternDetection));
}
