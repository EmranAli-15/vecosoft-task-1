import { useState } from 'react';
import Container from '../components/Container';

type OrderStatus = 'processing' | 'shipped' | 'out for delivery' | 'delivered';

interface ProductItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
    sku: string;
}

interface OrderData {
    orderId: string;
    datePlaced: string;
    estimatedDelivery: string; // e.g. ISO date or string representation
    status: OrderStatus;
    items: ProductItem[];
    shippingAddress: string;
    trackingNumber: string;
    carrier: string;
}

const DUMMY_ORDERS: OrderData[] = [
    {
        orderId: 'ORD-98234-US',
        datePlaced: 'October 12, 2026',
        // Setting an estimated delivery in the past to demonstrate the delayed warning banner requirement
        estimatedDelivery: 'October 18, 2026',
        status: 'out for delivery',
        trackingNumber: 'TRK-8392019482',
        carrier: 'Express Logistics Corp',
        shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477',
        items: [
            {
                id: 'p1',
                name: 'Ergonomic Executive Office Chair',
                quantity: 1,
                price: 249.99,
                image: 'https://placehold.co/100x100/18181b/f4f4f5?text=Chair',
                sku: 'CHAIR-ERG-01'
            },
            {
                id: 'p2',
                name: 'Adjustable Aluminum Laptop Stand',
                quantity: 2,
                price: 39.50,
                image: 'https://placehold.co/100x100/18181b/f4f4f5?text=Stand',
                sku: 'ACC-LAP-04'
            }
        ]
    },
    {
        orderId: 'ORD-54312-US',
        datePlaced: 'October 20, 2026',
        estimatedDelivery: 'October 30, 2026',
        status: 'processing',
        trackingNumber: 'TRK-1129384756',
        carrier: 'SwiftParcel Global',
        shippingAddress: '1042 Market Street, San Francisco, CA 94103',
        items: [
            {
                id: 'p3',
                name: 'Wireless Mechanical Keyboard RGB',
                quantity: 1,
                price: 129.00,
                image: 'https://placehold.co/100x100/18181b/f4f4f5?text=Keyboard',
                sku: 'TECH-KB-99'
            }
        ]
    }
];

export default function App() {
    const [orders, setOrders] = useState<OrderData[]>(DUMMY_ORDERS);
    const [selectedOrderId, setSelectedOrderId] = useState<string>(DUMMY_ORDERS[0].orderId);
    const [modalContent, setModalContent] = useState<{ title: string; message: string } | null>(null);

    const currentOrder = orders.find(o => o.orderId === selectedOrderId) || orders[0];

    // Helper to check if estimated delivery is exceeded (delayed)
    // Current mocked date context: late Oct 2026. Let's compare string/date safely or check flag.
    const isDelayed = (estimatedDateStr: string, status: OrderStatus) => {
        if (status === 'delivered') return false;
        const estDate = new Date(estimatedDateStr);
        const today = new Date('2026-10-24T12:00:00'); // simulated current reference time
        return today > estDate;
    };

    const orderDelayed = isDelayed(currentOrder.estimatedDelivery, currentOrder.status);

    // Status progression array
    const statuses: OrderStatus[] = ['processing', 'shipped', 'out for delivery', 'delivered'];
    const getStatusIndex = (st: OrderStatus) => statuses.indexOf(st);
    const currentIndex = getStatusIndex(currentOrder.status);

    const calculateSubtotal = () => {
        return currentOrder.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const shippingFee = 15.00;
    const tax = calculateSubtotal() * 0.08;
    const grandTotal = calculateSubtotal() + shippingFee + tax;

    return (
        <Container>
            <>
                <div className="min-h-screen bg-base-100 text-base-content font-sans antialiased selection:bg-primary selection:text-primary-content">

                    <main className="space-y-8">

                        {/* Top Status & Summary Header Card */}
                        <div className="card bg-base-200 border border-base-300 shadow-sm">
                            <div className="card bg-base-200 border border-base-300 shadow-sm">
                                <div className="card-body p-5 sm:p-8">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Order #{currentOrder.orderId}</h1>
                                                <span className={`badge uppercase font-semibold text-xs tracking-wider ${currentOrder.status === 'delivered' ? 'badge-success text-success-content' :
                                                    currentOrder.status === 'out for delivery' ? 'badge-primary text-primary-content' :
                                                        'badge-warning text-warning-content'
                                                    }`}>
                                                    {currentOrder.status}
                                                </span>
                                            </div>
                                            <p className="text-sm opacity-70 mt-1">Placed on {currentOrder.datePlaced} • Carrier: <span className="font-medium">{currentOrder.carrier}</span></p>
                                            <p className="text-xs opacity-60 mt-0.5 font-mono">Tracking ID: {currentOrder.trackingNumber}</p>
                                        </div>
                                    </div>

                                    {/* Warning Banner if order is delayed with integrated Contact Action */}
                                    {orderDelayed && (
                                        <div className="alert alert-warning mt-6 border border-warning/30 shadow-sm text-sm py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-start gap-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5 mt-0.5" fill="none" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                                <div>
                                                    <span className="font-bold">Delivery Delayed: </span>
                                                    Estimated delivery was <span className="underline font-semibold">{currentOrder.estimatedDelivery}</span> and has been exceeded. Our transit team is prioritizing your package.
                                                </div>
                                            </div>

                                            {/* Contact Action Button */}
                                            <a
                                                href="#support-section"
                                                className="btn btn-sm btn-warning text-warning-content font-semibold shrink-0 shadow-xs hover:brightness-95"
                                            >
                                                Inquire About Delay &rarr;
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        { }
                        <div className="card bg-base-200 border border-base-300 shadow-sm">
                            <div className="card-body p-5 sm:p-8">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
                                    <h2 className="text-lg font-bold tracking-tight">Shipment Progress</h2>
                                    <div className="text-sm">
                                        <span className="opacity-70">Estimated Delivery: </span>
                                        <span className={`font-bold ${orderDelayed ? 'text-warning font-extrabold' : ''}`}>
                                            {currentOrder.estimatedDelivery}
                                        </span>
                                    </div>
                                </div>

                                {/* Desktop & Mobile Responsive Timeline */}
                                <div className="py-4">
                                    <ul className="steps steps-vertical lg:steps-horizontal w-full">
                                        {statuses.map((st, idx) => {
                                            const isCompleted = idx <= currentIndex;
                                            const isCurrent = idx === currentIndex;
                                            return (
                                                <li
                                                    key={st}
                                                    className={`step ${isCompleted ? 'step-primary font-semibold' : 'opacity-50'} text-xs sm:text-sm capitalize`}
                                                >
                                                    <div className="flex flex-col items-center mt-2">
                                                        <span>{st}</span>
                                                        {isCurrent && (
                                                            <span className="badge badge-xs badge-primary mt-1 animate-pulse">Current</span>
                                                        )}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        { }
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Items list */}
                            <div className="lg:col-span-2 card bg-base-200 border border-base-300 shadow-sm">
                                <div className="card-body p-5 sm:p-8">
                                    <h2 className="text-lg font-bold tracking-tight mb-4">Product Summary ({currentOrder.items.length} items)</h2>
                                    <div className="divide-y divide-base-300">
                                        {currentOrder.items.map(item => (
                                            <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 rounded-xl object-cover bg-base-300 border border-base-300 shrink-0"
                                                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/18181b/f4f4f5?text=Item'; }}
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                                                    <p className="text-xs opacity-60 font-mono mt-0.5">SKU: {item.sku}</p>
                                                    <p className="text-xs opacity-70 mt-1">Qty: {item.quantity}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                                                    <div className="text-xs opacity-60">${item.price.toFixed(2)} each</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Pricing breakdown & Edge case action buttons */}
                            <div className="space-y-6">
                                <div className="card bg-base-200 border border-base-300 shadow-sm">
                                    <div className="card-body p-5 sm:p-6">
                                        <h3 className="font-bold text-base mb-3">Order Totals</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Subtotal</span>
                                                <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Shipping & Handling</span>
                                                <span className="font-medium">${shippingFee.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Estimated Tax</span>
                                                <span className="font-medium">${tax.toFixed(2)}</span>
                                            </div>
                                            <div className="divider my-1"></div>
                                            <div className="flex justify-between text-base font-bold">
                                                <span>Total Amount</span>
                                                <span className="text-primary">${grandTotal.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Requirement 7: Extra Edge-Case Action Buttons */}
                                <div className="card bg-base-200 border border-base-300 shadow-sm">
                                    <div className="card-body p-5 sm:p-6 space-y-3">
                                        <h3 className="font-bold text-sm uppercase tracking-wider opacity-70">Need Help with Delivery?</h3>
                                        <button
                                            onClick={() => setModalContent({
                                                title: 'Report: Delivered But Not Received',
                                                message: 'We are sorry to hear your package was marked delivered but not found. Please check with neighbors or building front desk. If still missing within 24 hours, our investigation team will issue a replacement or full refund.'
                                            })}
                                            className="btn btn-outline btn-sm w-full justify-start text-left border-base-300 hover:border-primary normal-case font-normal"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Delivered but not received?
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </main>

                    { }
                    {modalContent && (
                        <div className="modal modal-open">
                            <div className="modal-box border border-base-300 bg-base-100 max-w-md">
                                <h3 className="font-bold text-lg">{modalContent.title}</h3>
                                <p className="py-4 text-sm opacity-80 leading-relaxed">{modalContent.message}</p>
                                <div className="modal-action">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => setModalContent(null)}
                                    >
                                        Close & Return
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    { }
                    <footer className="footer footer-center p-6 bg-base-200 border-t border-base-300 text-base-content text-xs opacity-70 mt-12">
                        <div>
                            <p>LogiTrack Order Management System • Secure 256-bit Encryption</p>
                        </div>
                    </footer>
                </div>
            </>
        </Container>
    );
}