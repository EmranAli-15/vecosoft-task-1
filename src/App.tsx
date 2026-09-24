import React, { useState } from 'react';
import Container from './components/Container';
import { Link } from 'react-router-dom';

export type OrderStatus = 'processing' | 'shipped' | 'out for delivery' | 'delivered';

export interface ProductItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  sku: string;
}

export interface OrderData {
  orderId: string;
  datePlaced: string;
  estimatedDelivery: string;
  status: OrderStatus;
  items: ProductItem[];
  shippingAddress: string;
  trackingNumber: string;
  carrier: string;
}

export const DUMMY_ORDERS: OrderData[] = [
  {
    orderId: 'ORD-98234-US',
    datePlaced: 'October 12, 2026',
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
  },
  {
    orderId: 'ORD-12948-US',
    datePlaced: 'October 10, 2026',
    estimatedDelivery: 'October 15, 2026',
    status: 'delivered',
    trackingNumber: 'TRK-9988776655',
    carrier: 'Prime Air Cargo',
    shippingAddress: '450 Grand Avenue, Los Angeles, CA 90012',
    items: [
      {
        id: 'p4',
        name: 'Ultra-Wide Curved Gaming Monitor 34"',
        quantity: 1,
        price: 499.00,
        image: 'https://placehold.co/100x100/18181b/f4f4f5?text=Monitor',
        sku: 'ELEC-MON-34'
      },
      {
        id: 'p5',
        name: 'USB-C Multiport Hub Adapter',
        quantity: 1,
        price: 45.99,
        image: 'https://placehold.co/100x100/18181b/f4f4f5?text=Hub',
        sku: 'ACC-HUB-02'
      }
    ]
  },
  {
    orderId: 'ORD-33821-US',
    datePlaced: 'October 14, 2026',
    estimatedDelivery: 'October 21, 2026',
    status: 'shipped',
    trackingNumber: 'TRK-4433221100',
    carrier: 'Continental Freight',
    shippingAddress: '120 Peachtree St NE, Atlanta, GA 30303',
    items: [
      {
        id: 'p6',
        name: 'Noise-Canceling Wireless Headphones',
        quantity: 1,
        price: 199.99,
        image: 'https://placehold.co/100x100/18181b/f4f4f5?text=Audio',
        sku: 'TECH-AUD-88'
      }
    ]
  }
];

interface OrdersListPageProps {
  orders?: OrderData[];
  onSelectOrder?: (orderId: string) => void; // Fallback navigation prop if not using react-router directly
}

export default function OrdersListPage({ orders = DUMMY_ORDERS, onSelectOrder }: OrdersListPageProps) {

  // Simulated current reference date for checking delayed shipments
  const referenceDate = new Date('2026-10-24T12:00:00');

  const isDelayed = (estimatedDateStr: string, status: OrderStatus) => {
    if (status === 'delivered') return false;
    const estDate = new Date(estimatedDateStr);
    return referenceDate > estDate;
  };

  const calculateOrderTotal = (items: ProductItem[]) => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 15.00;
    const tax = subtotal * 0.08;
    return subtotal + shipping + tax;
  };

  return (
    <Container>
      <>
        <div className="min-h-screen bg-base-100 text-base-content font-sans antialiased">
          {/* Main Container */}
          <main className="space-y-6">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-base-200 p-6 rounded-2xl border border-base-300 shadow-xs">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Your Orders</h1>
                <p className="text-sm opacity-70 mt-1">Review active shipments, track progress, or check purchase history.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Contact / Support Section */}
                <div className="flex items-center gap-2 bg-base-100 px-3 py-1.5 rounded-xl border border-base-300 text-xs">
                  <span className="opacity-70">Need help?</span>
                  <a
                    href="tel:18005550199"
                    className="font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.606.606-.398.96a13.034 13.034 0 005.25 5.25c.354.208.843.012.96-.398l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                    </svg>
                    1-800-555-0199
                  </a>
                </div>

                {/* Total Orders Badge */}
                <div className="flex items-center gap-2">
                  <span className="badge badge-primary font-semibold p-3 text-xs">{orders.length} Total Orders</span>
                </div>
              </div>
            </div>

            {/* Orders Grid */}
            {DUMMY_ORDERS.length === 0 ? (
              <div className="text-center py-16 bg-base-200/50 rounded-2xl border border-dashed border-base-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto opacity-30 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-base font-semibold opacity-60">No orders found matching your search or filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {DUMMY_ORDERS.map(ord => {
                  const delayed = isDelayed(ord.estimatedDelivery, ord.status);
                  const total = calculateOrderTotal(ord.items);

                  return (
                    // ORD-98234-US
                    <Link to={`${ord.orderId == "ORD-98234-US" ? "/no-tracking-details" : "order-details"}`} key={ord.orderId} className="block group">
                      <div className={`card bg-base-200 border border-base-300 shadow-xs hover:shadow-md hover:border-primary transition-all duration-200 flex flex-col justify-between`}>
                        <div className="card-body p-5">

                          {/* Header Row: Order ID, Date, & Status Badge */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-base-300/60 flex items-center justify-center text-primary font-bold shadow-inner shrink-0">
                                📦
                              </div>
                              <div>
                                <h2 className="text-base font-bold group-hover:text-primary transition-colors">
                                  {ord.orderId}
                                </h2>
                                <div className="text-xs opacity-60 font-mono mt-0.5">Placed on {ord.datePlaced}</div>
                              </div>
                            </div>

                            <span className={`badge uppercase font-semibold text-xs tracking-wider px-3 py-2 ${ord.status === 'delivered' ? 'badge-success text-success-content' :
                              ord.status === 'out for delivery' ? 'badge-primary text-primary-content' :
                                'badge-warning text-warning-content'
                              }`}>
                              {ord.status}
                            </span>
                          </div>

                          {/* Visual Product Thumbnails & Names Preview */}
                          <div className="mt-4 p-3 rounded-xl bg-base-100/60 border border-base-300/50 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              <div className="flex -space-x-2 overflow-hidden shrink-0">
                                {ord.items.slice(0, 3).map((item, idx) => (
                                  <img
                                    key={idx}
                                    src={item.image}
                                    alt={item.name}
                                    className="inline-block h-9 w-9 rounded-lg object-cover ring-2 ring-base-200 shadow-xs"
                                  />
                                ))}
                              </div>
                              <div className="text-xs truncate">
                                <span className="font-semibold block truncate">{ord.items.map(i => i.name).join(', ')}</span>
                                <span className="opacity-60">{ord.items.reduce((acc, curr) => acc + curr.quantity, 0)} total item(s)</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="opacity-60 text-[10px] block uppercase font-mono">Total</span>
                              <span className="font-extrabold text-primary text-sm">${total.toFixed(2)}</span>
                            </div>
                          </div>

                          {/* Carrier & Delivery Info Footer */}
                          <div className="mt-4 pt-3 border-t border-base-300 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-4">
                              <div>
                                <span className="opacity-60 block text-[10px] uppercase">Carrier</span>
                                <span className="font-medium">{ord.carrier}</span>
                              </div>
                              <div className="hidden sm:block">
                                <span className="opacity-60 block text-[10px] uppercase">Est. Delivery</span>
                                <span className={`font-medium ${delayed ? 'text-warning font-bold' : ''}`}>
                                  {ord.estimatedDelivery} {delayed && '⚠️ Delayed'}
                                </span>
                              </div>
                            </div>

                            <span className="font-semibold text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                              View Details &rarr;
                            </span>
                          </div>

                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </main>

          {/* Footer */}
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