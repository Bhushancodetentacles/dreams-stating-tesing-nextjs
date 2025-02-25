"use client"
import Popup from '@/app/components/Popup';
import { ArrowLeft, BookImage,  X } from 'lucide-react'; // Adjust import according to your project's structure
import InvestorVerificationSuccessfulPopup from './InvestorVerificationSuccessfulPopup';
import React, { useState } from 'react'

const InvestorVerificationPreviewPage = () => {
    const [successVerification, setSuccessVerification] = useState(false);
    return (
        <>
            {
                successVerification && <Popup open={true} closeIcon={false} onDialogClose={setSuccessVerification} >
                    <InvestorVerificationSuccessfulPopup />
                </Popup>
            }
            <div className="bg-background min-h-screen px-6 sm:px-12 lg:px-[60px] py-[24px] flex flex-col gap-[24px]">
                <section>
                    <div className='flex flex-col gap-1'>
                        <h2 className="main-text text-xl md:text-2xl text-accent font-semibold flex items-center gap-2">
                            <ArrowLeft  />
                            KYC Verification
                        </h2>
                        <p className="text-sm font-normal main-text text-accent">
                            Keep your information accurate and up-to-date to ensure seamless communication and account security.
                        </p>
                    </div>
                </section>

                <section>
                    <div className="bg-contrast shadow-hover p-6 rounded-[24px] flex flex-col gap-[32px] text-accent">
                        <h5 className='main-text text-base font-medium'>Preview your documents</h5>
                        <div className='flex flex-col gap-[46px]'>
                            <div className='flex flex-col gap-[24px]'>
                                <div className='grid grid-cols-1 lg:grid-cols-3 justify-between gap-[24px]'>
                                    <div className='flex items-center justify-between bg-accentshade rounded-[8px] px-[18px] py-[16px] main-text'>
                                        <p className='font-medium text-base'>Country : <span className='text-lg'>India</span></p>
                                        <p><X /></p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-1 lg:grid-cols-3 justify-between gap-[24px]'>
                                    <div className='flex flex-col gap-3'>
                                        <h4 className='text-base font-medium main-text'>ID Proof (Driving License)</h4>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex items-center justify-between bg-accentshade rounded-[8px] px-[18px] py-[16px] main-text'>
                                                <p className='font-medium text-base flex items-center gap-3'> <BookImage /> driving-license-front.png</p>
                                                <p><X /></p>
                                            </div>
                                            <div className='flex items-center justify-between bg-accentshade rounded-[8px] px-[18px] py-[16px] main-text'>
                                                <p className='font-medium text-base flex items-center gap-3'><BookImage /> driving-license-front.png</p>
                                                <p><X /></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <h4 className='text-base font-medium main-text'>Address Proof (Electricity Bill)</h4>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex items-center justify-between bg-accentshade rounded-[8px] px-[18px] py-[16px] main-text'>
                                                <p className='font-medium text-base flex items-center gap-3'>  <BookImage /> electricity-bill.png</p>
                                                <p><X /></p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <h4 className='text-base font-medium main-text'>Passport Size Photo</h4>
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex items-center justify-between bg-accentshade rounded-[8px] px-[18px] py-[16px] main-text'>
                                                <p className='font-medium text-base flex items-center gap-3'> <BookImage /> passport-size-photo.png</p>
                                                <p><X /></p>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="flex  flex-col md:flex-row justify-center gap-[24px]">
                                <button className="bg-transparent main-text px-[42px] py-[15px] w-full md:w-[286px] border border-accent rounded-full text-lg font-semibold">Cancel</button>
                                <button onClick={() => setSuccessVerification(true)} className="btn-grad main-text px-[42px] py-[15px] w-full md:w-[286px] rounded-full text-lg font-semibold text-center text-contrast bg-accent hover:bg-buttonhover">Submit</button>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </>
    );
}

export default InvestorVerificationPreviewPage;
