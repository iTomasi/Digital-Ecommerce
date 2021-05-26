import React, {useEffect, useContext} from "react";
import {useParams} from "react-router-dom";

// Context
import ProductContext from "../context/product/ProductContext";

const ProductInfo = () => {
    const {getProductById, productInfo, products, getProducts} = useContext(ProductContext);

    const {id}: any = useParams();

    useEffect(() => {
        if (products[0] === undefined) {
            getProducts();
        }

        getProductById(id);

        // eslint-disable-next-line
    }, [products])


    return (
        <div className="productInfo">
            <h1>Product Info</h1>
            <h2>{productInfo.name}</h2>
        </div>
    )
};

export default ProductInfo;