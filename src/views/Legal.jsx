"use client";
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Legal = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('terms');

    // Sync state with URL path
    useEffect(() => {
        const path = pathname;
        if (path === '/terms') setActiveTab('terms');
        else if (path === '/refund-policy') setActiveTab('refund');
        else if (path === '/privacy-policy') setActiveTab('privacy');
    }, [pathname]);

    // Update URL when tab changes
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'terms') router.push('/terms');
        else if (tab === 'refund') router.push('/refund-policy');
        else if (tab === 'privacy') router.push('/privacy-policy');
    };

    return (
        <div className="legal-page">
            <Navbar />

            <style>{`
                /* ==================== LEGAL PAGE STYLES ==================== */
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

                .legal-page {
                    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: #F8FAFC;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }

                /* ==================== HERO SECTION ==================== */
                .legal-hero {
                    background: linear-gradient(135deg, #00529D 0%, #003D7A 100%);
                    padding: 80px 0 60px;
                    position: relative;
                    overflow: hidden;
                    color: white;
                    text-align: center;
                }

                .legal-hero-pattern {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50H50L40 70zM10 40L30 30V50L10 40zM70 40L50 50V30L70 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                    opacity: 0.5;
                    pointer-events: none;
                }

                .legal-title {
                    font-size: clamp(2rem, 4vw, 2.5rem);
                    font-weight: 700;
                    margin-bottom: 15px;
                    position: relative;
                    z-index: 1;
                }

                .legal-subtitle {
                    font-size: 1.1rem;
                    opacity: 0.9;
                    max-width: 600px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                /* ==================== CONTENT SECTION ==================== */
                .legal-container {
                    max-width: 1000px;
                    margin: -40px auto 60px;
                    padding: 0 20px;
                    position: relative;
                    z-index: 2;
                    flex-grow: 1;
                }

                .legal-card {
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    overflow: hidden;
                    min-height: 600px;
                }

                /* ==================== TABS ==================== */
                .legal-tabs {
                    display: flex;
                    background: white;
                    border-bottom: 1px solid #E2E8F0;
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }

                .legal-tab {
                    flex: 1;
                    padding: 20px;
                    text-align: center;
                    font-weight: 600;
                    color: #64748B;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-bottom: 3px solid transparent;
                    font-size: 1rem;
                }

                .legal-tab:hover {
                    color: #00529D;
                    background: #F8FAFC;
                }

                .legal-tab.active {
                    color: #00529D;
                    border-bottom-color: #00529D;
                    background: rgba(0, 82, 157, 0.02);
                }

                /* ==================== CONTENT BODY ==================== */
                .legal-content {
                    padding: 40px;
                    color: #334155;
                    line-height: 1.8;
                }

                .legal-content h3 {
                    color: #1E293B;
                    font-size: 1.5rem;
                    margin-bottom: 20px;
                    font-weight: 700;
                }

                .legal-content p {
                    margin-bottom: 20px;
                }

                .legal-content ul {
                    padding-left: 20px;
                    margin-bottom: 20px;
                    list-style-type: disc;
                }

                .legal-content li {
                    margin-bottom: 12px;
                }

                @media (max-width: 768px) {
                    .legal-tabs {
                        flex-direction: column;
                    }
                    .legal-tab {
                        padding: 15px;
                        border-bottom: 1px solid #F1F5F9;
                        border-left: 4px solid transparent;
                    }
                    .legal-tab.active {
                        border-bottom-color: #F1F5F9;
                        border-left-color: #00529D;
                    }
                    .legal-content {
                        padding: 25px;
                    }
                }
            `}</style>

            <div className="legal-hero">
                <div className="legal-hero-pattern"></div>
                <div className="container mx-auto px-4">
                    <h1 className="legal-title">Legal Information</h1>
                    <p className="legal-subtitle">Transparency and trust are at the core of our educational mission. Please review our policies below.</p>
                </div>
            </div>

            <div className="legal-container">
                <div className="legal-card">
                    <div className="legal-tabs">
                        <div
                            className={`legal-tab ${activeTab === 'terms' ? 'active' : ''}`}
                            onClick={() => handleTabChange('terms')}
                        >
                            Terms of Service
                        </div>
                        <div
                            className={`legal-tab ${activeTab === 'refund' ? 'active' : ''}`}
                            onClick={() => handleTabChange('refund')}
                        >
                            Refund Policy
                        </div>
                        <div
                            className={`legal-tab ${activeTab === 'privacy' ? 'active' : ''}`}
                            onClick={() => handleTabChange('privacy')}
                        >
                            Privacy Policy
                        </div>
                    </div>

                    <div className="legal-content">
                        {activeTab === 'terms' && (
                            <div className="animate-fade-in">
                                <h3>Terms & Conditions</h3>
                                <p>
                                    This document is an electronic record in terms of Information Technology Act, 2000 and rules there under as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.
                                </p>
                                <p>
                                    This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of domain name www.edufolio.org ('Website'), including the related mobile site and mobile application (hereinafter referred to as 'Platform').
                                </p>
                                <p>
                                    The Platform is owned by EDU FOLIO PRIVATE LIMITED, a company incorporated under the Companies Act, 1956 with its registered office at Jigsaw Co-working, 6th Floor, Kandamkulathy Towers, MG Road, KPCC Jn, Kochi - 682011 (hereinafter referred to as 'Platform Owner', 'we', 'us', 'our').
                                </p>
                                <p>
                                    Your use of the Platform and services and tools are governed by the following terms and conditions ('Terms of Use') as applicable to the Platform including the applicable policies which are incorporated herein by way of reference. If You transact on the Platform, You shall be subject to the policies that are applicable to the Platform for such transaction. By mere use of the Platform, You shall be contracting with the Platform Owner and these terms and conditions including the policies constitute Your binding obligations, with Platform Owner. These Terms of Use relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, 'Services'). Any terms and conditions proposed by You which are in addition to or which conflict with these Terms of Use are expressly rejected by the Platform Owner and shall be of no force or effect. These Terms of Use can be modified at any time without assigning any reason. It is your responsibility to periodically review these Terms of Use to stay informed of updates.
                                </p>
                                <p>
                                    ACCESSING, BROWSING OR OTHERWISE USING THE PLATFORM INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS UNDER THESE TERMS OF USE, SO PLEASE READ THE TERMS OF USE CAREFULLY BEFORE PROCEEDING.
                                </p>
                                <p>The use of Platform and/or availing of our Services is subject to the following Terms of Use:</p>
                                <ul>
                                    <li>To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account on the Platform.</li>
                                    <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                                    <li>Your use of our Services and the Platform is solely and entirely at your own risk and discretion for which we shall not be liable to you in any manner. You are required to independently assess and ensure that the Services meet your requirements.</li>
                                    <li>The contents of the Platform and the Services are proprietary to us and are licensed to us. You will not have any authority to claim any intellectual property rights, title, or interest in its contents. The contents includes and is not limited to the design, layout, look and graphics.</li>
                                    <li>You acknowledge that unauthorized use of the Platform and/or the Services may lead to action against you as per these Terms of Use and/or applicable laws.</li>
                                    <li>You agree to pay us the charges associated with availing the Services.</li>
                                    <li>You agree not to use the Platform and/ or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.</li>
                                    <li>You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites. These links are provided for your convenience for provide further information.</li>
                                    <li>You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with the Platform Owner for the Services.</li>
                                    <li>You shall indemnify and hold harmless Platform Owner, its affiliates, group companies (as applicable) and their respective officers, directors, agents, and employees, from any claim or demand, or actions including reasonable attorney's fees, made by any third party or penalty imposed due to or arising out of Your breach of this Terms of Use, privacy Policy and other Policies, or Your violation of any law, rules or regulations or the rights (including infringement of intellectual property rights) of a third party.</li>
                                    <li>Notwithstanding anything contained in these Terms of Use, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.</li>
                                    <li>These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.</li>
                                    <li>All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Kochi.</li>
                                    <li>All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website.</li>
                                </ul>
                            </div>
                        )}

                        {activeTab === 'refund' && (
                            <div className="animate-fade-in">
                                <h3>Refund and Cancellation Policy</h3>
                                <p>
                                    This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service that you have purchased through the Platform. Under this policy:
                                </p>
                                <ul>
                                    <li>Cancellations will only be considered if the request is made 10 days of placing the order. However, cancellation requests may not be entertained if the orders have been communicated to such sellers / merchant(s) listed on the Platform and they have initiated the process of shipping them, or the product is out for delivery. In such an event, you may choose to reject the product at the doorstep.</li>
                                    <li>EDU FOLIO PRIVATE LIMITED does not accept cancellation requests for perishable items like flowers, eatables, etc. However, the refund / replacement can be made if the user establishes that the quality of the product delivered is not good.</li>
                                    <li>In case of receipt of damaged or defective items, please report to our customer service team. The request would be entertained once the seller/ merchant listed on the Platform, has checked and determined the same at its own end. This should be reported within 10 days of receipt of products. In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 10 days of receiving the product. The customer service team after looking into your complaint will take an appropriate decision.</li>
                                    <li>In case of complaints regarding the products that come with a warranty from the manufacturers, please refer the issue to them.</li>
                                    <li>In case of any refunds approved by EDU FOLIO PRIVATE LIMITED, it will take 15 days for the refund to be processed to you.</li>
                                </ul>
                            </div>
                        )}

                        {activeTab === 'privacy' && (
                            <div className="animate-fade-in">
                                <h3>Privacy Policy</h3>
                                <p>
                                    Privacy Policy will be updated shortly.
                                </p>
                                <p>
                                    EDU FOLIO PRIVATE LIMITED is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your personal information.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Legal;
