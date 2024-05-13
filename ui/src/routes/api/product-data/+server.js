export async function GET({fetch}) {
    const response = await fetch("http://localhost:3000/product-data");
    const productData = await response.json();
    if (productData.errors) {
        throw new Error(productData.errors);
    }
    return new Response(JSON.stringify(productData));
}
