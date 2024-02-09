import { useEffect, useState } from "react";
import "./styles.css";

const API_URL = "https://dummyjson.com/products";
const PRODUCTS_LIMIT = 20;

export default function LoadMoreData() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [disableButton, setDisableButton] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}?limit=${PRODUCTS_LIMIT}&skip=${count * PRODUCTS_LIMIT}`);
            const result = await response.json();

            if (result && result.products && result.products.length) {
                setProducts((prevData) => [...prevData, ...result.products]);
                setLoading(false);
            }

            console.log(result);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [count]);

    useEffect(() => {
        if (products.length === 100) setDisableButton(true);
    }, [products]);

    if (loading) {
        return <div>Loading data! Please wait.</div>;
    }

    return (
        <div className="load-more-container">
            <div className="product-container">
                {products.length ? (
                    products.map((item, index) => (
                        // <div className="product" key={item.id || index}> this key implementation gives following warning in the browser console : Warning: Each child in a list should have a unique "key" prop.
                        <div className="product" key={index}>
                            <img src={item.thumbnail} alt={item.title} />
                            <p>{item.title}</p>
                        </div>
                    ))
                ) : null}
            </div>
            <div className="button-container">
                <button disabled={disableButton} onClick={() => setCount((prevCount) => prevCount + 1)}>
                    Load More Products
                </button>
                {disableButton && <p>You have reached 100 products</p>}
            </div>
        </div>
    );
}
