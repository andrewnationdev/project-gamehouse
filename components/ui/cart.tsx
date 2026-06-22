import { Trash2, X } from 'lucide-react';
import { ICartDrawerProps } from '../../types/cart';

export default function CartDrawerComponent(props: ICartDrawerProps) {
  return <div
    className="fixed inset-0 bg-black/50 z-20 transition-opacity"
    onClick={props.toggleCart}>
    <div
      className="absolute right-0 top-0 w-80 h-full bg-[#1b2838] p-6 shadow-2xl border-l border-gray-700 animate-in slide-in-from-right"
      onClick={e => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-xl text-white">Carrinho</h2>
        <button onClick={props.toggleCart}><X /></button>
      </div>
      <div className="space-y-4">
        {props.cart.length === 0 && <p className="text-gray-500 text-center mt-10">Carrinho vazio.</p>}
        {props.cart.map((item, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-gray-700">
            <span className="text-sm">{item.name}</span>
            <div className="flex items-center gap-4">
              <span className="font-bold text-green-400">R$ {item.price.toFixed(2)}</span>
              <button onClick={() => props.handleRemoveFromCart(i)} className="text-red-500 hover:text-red-300"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
      {props.cart.length > 0 && <button className="w-full mt-6 bg-green-600 py-3 rounded font-bold hover:bg-green-500 transition shadow-lg">Finalizar Compra</button>}
    </div>
  </div>
}