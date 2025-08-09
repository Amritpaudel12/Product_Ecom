
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AdminOrder() {
    const [cart, setCart] = useState({ product: [] });
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const removeCart = (id) => {
        const updatedProducts = cart.product.filter(product => product.id !== id);
        const updatedCart = { product: updatedProducts };
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2">Cart Details</h2>
                {user && (
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">User Details</h3>
                        <p>Username: <span className="font-medium">{user.username}</span></p>
                        <p>Email: <span className="font-medium">{user.email}</span></p>
                        <p>Is Admin: <span className="font-medium">{user.isAdmin ? "Yes" : "No"}</span></p>
                    </div>
                )}
                {
                    cart.product.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {
                                cart.product.map((product, index) => (
                                    <div key={index} className="flex items-center justify-between border-b pb-4">
                                        <div className="flex items-center gap-4">
                                            <img src={product.image} alt="Product" className="h-20 w-20 object-cover rounded" />
                                            <div>
                                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                                <p className="text-sm text-gray-600">Category: {product.category}</p>
                                                <p className="text-sm text-gray-800 font-medium">Price: Rs. {product.price}</p>
                                            </div>
                                        </div>
                                        <button
                                            className="text-red-600 hover:text-red-800 font-medium"
                                            onClick={() => removeCart(product.id)}
                                        >
                                            <Link to="#">Remove</Link>
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <p className="text-gray-600">No products in the cart.</p>
                    )
                }
            </div>
        </div>
    );
}

export default AdminOrder;
