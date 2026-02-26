"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RefundPolicy = () => {
    return (
        <div className="font-outfit bg-gray-50 min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Refund and Cancellation Policy</h1>

                <div className="bg-white p-8 rounded-xl shadow-sm space-y-6 text-gray-600 leading-relaxed">
                    <p>
                        This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service that you have purchased through the Platform. Under this policy:
                    </p>

                    <ul className="list-disc pl-5 space-y-4">
                        <li>
                            Cancellations will only be considered if the request is made 10 days of placing the order. However, cancellation requests may not be entertained if the orders have been communicated to such sellers / merchant(s) listed on the Platform and they have initiated the process of shipping them, or the product is out for delivery. In such an event, you may choose to reject the product at the doorstep.
                        </li>
                        <li>
                            EDU FOLIO PRIVATE LIMITED does not accept cancellation requests for perishable items like flowers, eatables, etc. However, the refund / replacement can be made if the user establishes that the quality of the product delivered is not good.
                        </li>
                        <li>
                            In case of receipt of damaged or defective items, please report to our customer service team. The request would be entertained once the seller/ merchant listed on the Platform, has checked and determined the same at its own end. This should be reported within 10 days of receipt of products. In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 10 days of receiving the product. The customer service team after looking into your complaint will take an appropriate decision.
                        </li>
                        <li>
                            In case of complaints regarding the products that come with a warranty from the manufacturers, please refer the issue to them.
                        </li>
                        <li>
                            In case of any refunds approved by EDU FOLIO PRIVATE LIMITED, it will take 15 days for the refund to be processed to you.
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RefundPolicy;
