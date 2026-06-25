import NavbarComponent from './navbar';
import CartDrawerComponent from '../elements/cart';
import { useStore } from '../../../store/store';
import FooterComponent from './footer';

export default function Layout({ children }) {
    const { cart,
        toggleCart,
        isCartOpen,
        removeFromCart,
        handleSearch } = useStore();

    const handleRemoveFromCart = (id: number) => {
        removeFromCart(id);
    }

    return (
        <div className="min-h-screen bg-[#1b2838] text-gray-200 font-sans">
            <NavbarComponent
                title={'Project GameHouse'}
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

            <FooterComponent/>
        </div>
    );
}