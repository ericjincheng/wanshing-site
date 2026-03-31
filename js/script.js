// --- CONFIGURATION ---
// Replace 'YOUR_PROJECT_ID' with the ID from your Sanity manage dashboard
const PROJECT_ID = '7rppd6fc'; 
const DATASET = 'production';

// This is "GROQ" - Sanity's language to ask for specific data
const QUERY = encodeURIComponent('*[_type == "product"]{title, description, price, "imageUrl": images[0].asset->url}');

// --- THE ENGINE ---
const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

async function fetchProducts() {
    try {
        const response = await fetch(URL);
        const { result } = await response.json();
        
        const container = document.getElementById('product-list');
        
        if (!container) {
            console.error("Could not find an element with id 'product-list' in your HTML.");
            return;
        }

        if (result && result.length > 0) {
            // Clear the loading message
            container.innerHTML = ''; 

            // Loop through each product and create the HTML for it
            result.forEach(product => {
                const productCard = `
                    <div style="border: 1px solid #eee; padding: 20px; margin-bottom: 20px; border-radius: 10px; font-family: sans-serif;">
                        ${product.imageUrl ? `<img src="${product.imageUrl}" style="width: 100%; max-width: 300px; border-radius: 5px;" />` : ''}
                        <h2 style="margin: 10px 0 5px 0;">${product.title}</h2>
                        <p style="color: #666;">${product.description || ''}</p>
                        <p style="font-weight: bold; color: #2ecc71;">$${product.price}</p>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', productCard);
            });
        } else {
            container.innerHTML = '<p>No products found. Add some in your Sanity Studio!</p>';
        }
    } catch (error) {
        console.error('Error fetching from Sanity:', error);
    }
}

// Run the function when the page loads
fetchProducts();
