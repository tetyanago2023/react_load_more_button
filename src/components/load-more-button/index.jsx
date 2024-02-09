import {useEffect, useState} from "react";

export default function LoadMoreData() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);

    async function fetchProducts (){
        try {
            setLoading(true);
            const response = await fetch(
                `https://dummyjson.com/products?limit=20&skip=${
                    count === 0 ? 0 : count * 20
                }`
            );

            const result = await response.json();

            console.log(result);
        }catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [count]);

    return (
        <div className={"container"}>

        </div>
    )
}