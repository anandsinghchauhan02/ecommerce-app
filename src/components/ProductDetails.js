import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if(id){
            axios.get(`http://localhost:3001/productDetails?id=${id}`).then((response) => {
                setProduct(...response.data);
            });
        }
    }, [id]);

    if (!product) return <div>Loading...</div>;
    return (
        <div className="container">
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
            <h1>Product Details</h1>
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
        </div>
    );
}

export default ProductDetails;
