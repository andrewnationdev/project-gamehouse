import NavbarComponent from './navbar';
import CartDrawerComponent from './ui/cart';
import { useStore } from '../store/store';

export default function Layout({ children }) {
    const { cart,
        toggleCart,
        isCartOpen,
        removeFromCart,
        navigateTo,
        handleSearch } = useStore();

    const handleRemoveFromCart = (id: number) => {
        removeFromCart(id);
    }

    return (
        <div className="min-h-screen bg-[#1b2838] text-gray-200 font-sans">
            <NavbarComponent
                title={'Project Gamehouse'}
                navigateTo={navigateTo}
                cart={cart}
                toggleCart={toggleCart}
                handleSearch={handleSearch}
            />

            <main>{children}</main>

            {isCartOpen && (
                <CartDrawerComponent
                    cart={cart}
                    toggleCart={toggleCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                />
            )}
        </div>
    );
}