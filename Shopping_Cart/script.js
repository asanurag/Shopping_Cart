// Fetch product data from the provided API
fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json')
    .then(response => response.json())
    .then(data => {
        // Populate the product details based on the fetched data
        populateProductDetails(data.product);
    })
    .catch(error => console.error('Error fetching product data:', error));

function populateProductDetails(productData) {
    // Add your code to populate the HTML elements with the product details
    document.getElementById('productImage').src = productData.images[0].src;
    document.getElementById('productVendor').innerText = productData.vendor;
    document.getElementById('productTitle').innerText = productData.title;
    document.getElementById('price').innerText = `Price: ${productData.price}`;
    document.getElementById('comparePrice').innerText = `Compare at Price: ${productData.compare_at_price}`;
    document.getElementById('percentageOff').innerText = `Percentage off: ${calculatePercentageOff(productData.price, productData.compare_at_price)}%`;
    document.getElementById('description').innerHTML = productData.description;

    // Add color options
    const colorSelector = document.getElementById('colorSelector');
    productData.options.find(option => option.name === 'Color').values.forEach(color => {
        const option = document.createElement('option');
        option.value = Object.keys(color)[0];
        option.innerText = Object.keys(color)[0];
        colorSelector.appendChild(option);
    });

    // Add size options
    const sizeSelector = document.getElementById('sizeSelector');
    productData.options.find(option => option.name === 'Size').values.forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.innerText = size;
        sizeSelector.appendChild(option);
    });

    // Add thumbnails
    const thumbnailsContainer = document.getElementById('thumbnails');
    productData.images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = `Thumbnail ${index + 1}`;
        img.addEventListener('click', () => {
            document.getElementById('productImage').src = image.src;
        });
        thumbnailsContainer.appendChild(img);
    });
}

function calculatePercentageOff(price, comparePrice) {
    const percentageOff = ((comparePrice - price) / comparePrice) * 100;
    return percentageOff.toFixed(2);
}

function addToCart() {
    // Add your code to handle adding the product to the cart
    // For example, you can display a confirmation message
    const addToCartMessage = document.getElementById('addToCartMessage');
    addToCartMessage.innerText = 'Product added to cart!';
    addToCartMessage.style.display = 'block';
}
