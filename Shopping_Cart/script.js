function populateProductDetails(productData) {
    // Add your code to populate the HTML elements with the product details
    document.getElementById('productImage').src = productData.images[0].src;
    document.getElementById('productVendor').innerText = productData.vendor;
    document.getElementById('productTitle').innerText = productData.title;

    // Display original price
    document.getElementById('price').innerText = `Price: ${productData.price}`;

    // Display discounted price and percentage off
    const comparePriceElement = document.getElementById('comparePrice');
    const discountedPrice = parseFloat(productData.compare_at_price.replace('$', '').replace(',', ''));
    const percentageOff = calculatePercentageOff(productData.price, discountedPrice);

    comparePriceElement.innerHTML = `Discounted Price: <span style="color: red;">${productData.compare_at_price}</span>`;
    
    const percentageOffElement = document.getElementById('percentageOff');
    percentageOffElement.innerHTML = `(${percentageOff}% off)`;

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
