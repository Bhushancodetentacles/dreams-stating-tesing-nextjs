"use client";
import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import BuyTab from './BuyTab'; // Import the BuyTab component
import SaleTab from './SaleTab'; // Optional: Add a SaleTab component for Sale

const SecondaryMarketPage = () => {
    const [activeTab, setActiveTab] = useState("Buy"); // Manage the active tab state

    return (
        <div className="bg-background min-h-screen px-[10px] md:px-[60px] py-[24px] flex flex-col gap-[24px]">
            {/* Header Section */}
            <section>
                <div >
                    <h2 className="main-text text-xl md:text-2xl font-semibold flex items-center gap-4 text-accent">
                        <ArrowLeft  className='cursor-pointer' size={32} onClick={() => history.go(-1)}/> Secondary Market</h2>
                </div>
            </section>

            {/* Tabs Section */}
            <section>
                <div className="flex flex-col gap-[24px]">
                    <div className="flex items-center gap-20 main-text">
                        <div
                            onClick={() => setActiveTab("Buy")}
                            className={`cursor-pointer border-b-2 w-28 text-center text-accent text-2xl font-semibold p-2 ${activeTab === "Buy" ? "border-accent" : "border-transparent"
                                }`}
                        >
                            Buy
                        </div>
                        <div
                            onClick={() => setActiveTab("Sale")}
                            className={`cursor-pointer border-b-2 w-28 text-center  text-accent text-2xl font-semibold p-2 ${activeTab === "Sale" ? "border-accent" : "border-transparent"
                                }`}
                        >
                            Sell
                        </div>
                    </div>
                    <div className="text-accent font-medium main-text">
                        {activeTab === "Buy" ? (
                            <div>Buy secondary property tokens for more investment</div>
                        ) : (
                            <div className='flex flex-col md:flex-row justify-between items-center gap-[24px]'>
                                <p>Sell your property tokens in secondary market</p>
                                {/* <button className='font-semibold py-[8px] px-[24px] border border-[#707070] rounded-[8px] hover:bg-accent hover:text-background transition-all duration-300'>Your Property Tokens for Sale</button> */}
                            </div>
                        )}
                    </div>


                    {/* Tab Content */}
                    <div>
                        {activeTab === "Buy" && <BuyTab />} {/* Render BuyTab when active */}
                        {activeTab === "Sale" && <SaleTab />} {/* Optional: Render SaleTab */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SecondaryMarketPage;
