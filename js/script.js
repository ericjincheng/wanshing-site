// --- CONFIGURATION ---
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
                    <div class="product-card bg-white rounded-xl border border-steel-200 overflow-hidden group p-5 flex flex-col h-full">
                        <div class="relative aspect-[4/3] overflow-hidden mb-4 rounded-lg bg-steel-100">
                            ${product.imageUrl ? 
                                `<img src="${product.imageUrl}" class="card-img w-full h-full object-cover" />` : 
                                `<div class="w-full h-full flex items-center justify-center text-steel-300">No Image</div>`
                            }
                            <div class="absolute top-3 left-3 bg-ws-red text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm">Live Stock</div>
                        </div>
                        
                        <div class="flex-grow">
                            <div class="text-[10px] font-semibold text-ws-red tracking-wider uppercase mb-1">Equipment Catalog</div>
                            <h3 class="font-display font-bold text-steel-900 text-lg leading-tight mb-2">${product.title}</h3>
                            <p class="text-xs text-steel-500 line-clamp-3">${product.description || ''}</p>
                        </div>

                        <div class="mt-6 pt-4 border-t border-steel-100">
                            <div class="text-ws-red font-display font-bold text-xl mb-4">$${product.price ? product.price.toLocaleString() : 'Call for Price'}</div>
                            <a href="#quote" class="w-full inline-flex items-center justify-center gap-2 bg-steel-900 hover:bg-ws-red text-white font-semibold text-sm py-3 rounded-lg transition-all duration-300">
                                Inquire Now 
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </a>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', productCard);
            });
        } else {
            container.innerHTML = '<p class="col-span-full text-center text-steel-500 italic">No products found. Add some in your Sanity Studio!</p>';
        }
    } catch (error) {
        console.error('Error fetching from Sanity:', error);
    }
}

// Run the function when the page loads
fetchProducts();
