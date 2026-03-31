// 1. --- CONFIGURATION ---
const client = SanityClient.createClient({
  projectId: '7rppd6fc',
  dataset: 'production',
  useCdn: true, 
  apiVersion: '2026-03-31', 
});

// 2. --- THE ENGINE ---
async function fetchProducts() {
    try {
        // We use the client.fetch method - it's much more reliable than building a URL manually
        const query = `*[_type == "product"]{
            title, 
            description, 
            price, 
            "imageUrl": image.asset->url
        }`;
        
        const products = await client.fetch(query);
        
        // IMPORTANT: Ensure your HTML has id="product-list"
        const container = document.getElementById('product-list');
        
        if (!container) {
            console.error("Could not find an element with id 'product-list' in your HTML.");
            return;
        }

        if (products && products.length > 0) {
            container.innerHTML = ''; // Clear the "Loading" message

            products.forEach(product => {
                const productCard = `
                    <div class="product-card bg-white rounded-xl border border-steel-200 overflow-hidden group p-5 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                        <div class="relative aspect-[4/3] overflow-hidden mb-4 rounded-lg bg-steel-100">
                            ${product.imageUrl ? 
                                `<img src="${product.imageUrl}" class="card-img w-full h-full object-cover" alt="${product.title}" />` : 
                                `<div class="w-full h-full flex items-center justify-center text-steel-300">No Image</div>`
                            }
                            <div class="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm">Live Stock</div>
                        </div>
                        
                        <div class="flex-grow">
                            <div class="text-[10px] font-semibold text-red-600 tracking-wider uppercase mb-1">Equipment Catalog</div>
                            <h3 class="font-bold text-slate-900 text-lg leading-tight mb-2">${product.title}</h3>
                            <p class="text-xs text-slate-500 line-clamp-3">${product.description || 'No description available.'}</p>
                        </div>

                        <div class="mt-6 pt-4 border-t border-steel-100">
                            <div class="text-red-600 font-bold text-xl mb-4">$${product.price ? product.price.toLocaleString() : 'Call for Price'}</div>
                            <a href="#quote" class="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-red-600 text-white font-semibold text-sm py-3 rounded-lg transition-all duration-300">
                                Inquire Now 
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                            </a>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', productCard);
            });
        } else {
            container.innerHTML = '<p class="col-span-full text-center text-slate-500 italic">No products found. Add some in your Sanity Studio!</p>';
        }
    } catch (error) {
        console.error('Error fetching from Sanity:', error);
        const container = document.getElementById('product-list');
        if (container) container.innerHTML = '<p class="text-center text-red-500">Error connecting to catalog.</p>';
    }
}

// Run the function
fetchProducts();
