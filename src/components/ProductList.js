import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(1);

    useEffect(() => {
        axios.get('http://localhost:3001/categories').then((response) => {
            setCategories(response.data);
        });

        axios.get(`http://localhost:3001/products?categoryId=${selectedCategory}`).then((response) => {
            setProducts(response.data);
        });
    }, [selectedCategory]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(Number(event.target.value));
    };

    return (
        <div className="container">
            <h1>Product List</h1>
            <select value={selectedCategory} onChange={handleCategoryChange}>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <div className="d-flex flex-wrap justify-content-center">
                {products.map((product) => (
                    <div key={product.id} className="list-item-container text-center">
                        <Link to={`/product/${product.id}`}>
                            <img src={product.imageUrl} alt={product.name} />
                            <p>{product.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
