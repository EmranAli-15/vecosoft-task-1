import { Link } from 'react-router-dom';

interface TrackingNotFoundPageProps {
    orderId?: string;
    onBackToOrders?: () => void;
}

export default function TrackingNotFoundPage({
    orderId = 'UNKNOWN-ORDER',
    onBackToOrders
}: TrackingNotFoundPageProps) {
    const handleBackNavigation = () => {
        if (onBackToOrders) {
            onBackToOrders();
        } else {
            // Fallback if used with react-router or standard window location
            window.location.hash = '/';
        }
    };

    return (
        <div className="min-h-screen bg-base-100 text-base-content font-sans flex flex-col justify-between antialiased">

            {/* Main 404 / Tracking Unavailable Content */}
            <main className="max-w-md mx-auto px-4 py-16 sm:py-24 text-center my-auto w-full">
                <div className="bg-base-200 border border-base-300 p-8 sm:p-10 rounded-3xl shadow-sm flex flex-col items-center">

                    {/* Icon Visual Indicator */}
                    <div className="w-20 h-20 bg-warning/10 text-warning rounded-2xl flex items-center justify-center mb-6 border border-warning/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6" />
                        </svg>
                    </div>

                    <span className="badge badge-warning font-semibold text-xs tracking-wider uppercase mb-3">
                        Error 404 • Not Found
                    </span>

                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                        Tracking Not Available
                    </h1>

                    <p className="text-sm opacity-70 mb-6 leading-relaxed">
                        We couldn't locate active telemetry or tracking data for order reference <span className="font-mono font-bold text-base-content">"{orderId}"</span>. It may be invalid, archived, or currently syncing with the carrier network.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <Link to="/">
                            <button
                                onClick={handleBackNavigation}
                                className="btn btn-primary w-full gap-2 font-medium"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Return to All Orders
                            </button>
                        </Link>
                    </div>

                    <div className="mt-6 pt-6 border-t border-base-300 w-full text-xs opacity-60">
                        Need urgent assistance? Contact customer support with your receipt.
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="footer footer-center p-6 bg-base-200 border-t border-base-300 text-base-content text-xs opacity-70">
                <div>
                    <p>LogiTrack Order Management System • Secure 256-bit Encryption</p>
                </div>
            </footer>
        </div>
    );
}