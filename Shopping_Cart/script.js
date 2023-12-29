// Fetch product data from the provided API
fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json')
    .then(response => response.json())
    .then(data => {
        // Populate the product details based on the fetched data
        populateProductDetails(data.product);
    })
    .catch(error => console.error('Error fetching product data:', error));

function calculatePercentageOff(originalPrice, discountedPrice) {
    const percentageOff = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return percentageOff.toFixed(2);
}

function addToCart() {
    // Add your code to handle adding the product to the cart
    // For example, you can display a confirmation message
    const addToCartMessage = document.getElementById('addToCartMessage');
    addToCartMessage.innerText = 'Product added to cart!';
    addToCartMessage.style.display = 'block';
}

// Add the new function populateProductDetails here
function populateProductDetails(productData) {
    // Add your code to populate the HTML elements with the product details
    document.getElementById('productImage').src = productData.images[0].src;
    document.getElementById('productVendor').innerText = productData.vendor;
    document.getElementById('productTitle').innerText = productData.title;

    // Display original price in blue and bold
    const priceElement = document.getElementById('price');
    priceElement.innerHTML = `<span style="color: Gray; font-weight: bold;">${productData.compare_at_price}</span>`;

    // Display discounted price and percentage off
    const comparePriceElement = document.getElementById('comparePrice');
    const discountedPrice = parseFloat(productData.price.replace('$', '').replace(',', ''));
    const percentageOff = calculatePercentageOff(parseFloat(productData.compare_at_price.replace('$', '').replace(',', '')), discountedPrice);

    comparePriceElement.innerHTML = `<span style="color: #5A0AC0; font-weight: bold;">${productData.price}</span>`;

    // Display percentage off to the right of discounted price
    const percentageOffElement = document.getElementById('percentageOff');
    percentageOffElement.innerHTML = `(${percentageOff}% off)`;

    // Use innerHTML for description to handle HTML content
    document.getElementById('description').innerHTML = productData.description;

    // Add color options
    const colorSelector = document.getElementById('colorSelector');
    const colorSwatchesContainer = document.getElementById('colorSwatches');
    colorSwatchesContainer.innerHTML = ''; // Clear previous content

    productData.options.find(option => option.name === 'Color').values.forEach(color => {
        const colorName = Object.keys(color)[0];
        const colorCode = color[colorName];

        const option = document.createElement('option');
        option.value = colorName;
        option.innerText = colorName;
        colorSelector.appendChild(option);

        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = colorCode;
        swatch.title = colorName; // Tooltip with color name
        swatch.addEventListener('click', () => handleColorSelection(colorName));

        colorSwatchesContainer.appendChild(swatch);
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
    thumbnailsContainer.innerHTML = ''; // Clear previous content
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
