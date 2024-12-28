const allProduct = () => {
    fetch('https://fakestoreapi.com/products')
            .then((res) =>res.json())
            .then((data) => {
                displayProduct(data);
            });
};

const displayProduct = (products) => {
    const productContainer = document.getElementById("product-container");

    products.forEach((product) => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
                <img class="card-img" src="${product.image}" alt="${product.title}"/>
                <h3>${product.title.slice(0,10)}</h3>
                <h4>Price: $${product.price}</h4>
                <p>${product.description.slice(0,35)}</p>
                <button onclick="handleCart('${product.title}',${product.price})">Add to cart</button>
                <button onclick="details('${product.id}')">Details</button>
        `;
        productContainer.appendChild(div);
    });
};

const handleCart = (name,price) => {
    const productCount = document.getElementById("count").innerText;
    let convertedCount = parseInt(productCount);
    convertedCount += 1;
    document.getElementById("count").innerText = convertedCount;

    const container = document.getElementById("cart-add");

    const div = document.createElement("div");
    div.classList.add("cart-info");

    div.innerHTML = `
        <h3>${name.slice(0,10)}</h3>
        <h3 class="price">${price}</h3>
    `
    container.appendChild(div);
    totalPrice();
}

const totalPrice = () => {
    const allProduct = document.getElementsByClassName("price");
    let count = 0;
    for(const element of allProduct)
    {
        count = count + parseFloat(element.innerText);
    }
    document.getElementById("total").innerText = count.toFixed(2);
}

const details = (id) => {
    console.log(id);
    fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(product => {
                const modalBody = document.getElementById("modal-body-content");
                modalBody.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" class="img-fluid mb-3" />
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <h4>Price: $${product.price}</h4>
                    <p>Category: ${product.category}</p>
                `;
                const modal = new bootstrap.Modal(document.getElementById("detailsModal"));
                modal.show();
            })
}
allProduct();