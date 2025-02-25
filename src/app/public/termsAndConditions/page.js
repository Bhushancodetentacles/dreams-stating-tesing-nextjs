import React from 'react'

const TermsAndConditionsPage = () => {
    return (
        <div className='min-h-screen pt-5 lg:p-[61px] container'>
            <div className='flex flex-col gap-[32px]'>
                <div className='flex flex-col gap-2'>
                    <h3 className='main-text text-2xl font-bold text-accent'>Terms and Conditions</h3>
                    <p className='main-text text-sm font-normal text-accent'>Accept the Terms</p>
                </div>
                <div className='grey-grad p-6 flex flex-col gap-[36px] rounded-[18px]'>
                    <p className='main-text font-normal text-accent'>A Terms and Conditions agreement outlines the terms that visitors must agree to if they want to interact with your website. Essentially, if the visitor continues to use the website after accepting the Terms, they enter into a contract with you.</p>
                    <div className='flex flex-col gap-4'>
                        <p className='main-text font-normal text-accent' >Note that you&apos;ll sometimes see this agreement referred to as a Terms of Use, User Agreement or Terms of Service agreement. These terms are interchangeable and refer to the same type of agreement.</p>
                        <p className='main-text font-normal text-accent'>The purpose of a Terms and Conditions agreement is to prevent misunderstandings between the business owner (you), and the consumer. The agreement helps you:</p>
                        <ul className="main-text font-normal text-accent list-disc list-inside">
                            <li>Protect your intellectual property</li>
                            <li>Avoid website abuse</li>
                            <li>Define the limits of your legal obligations to the consumer</li>
                        </ul>

                        <p className='main-text font-normal text-accent'>Essentially, the T&C helps you run your business more effectively and with greater peace of mind.</p>
                        <p className='main-text font-normal text-accent'>This agreement forms the basis of an enforceable legal relationship. It tells anyone browsing your website, whether they are a casual visitor or an active client, what their legal responsibilities and rights are.</p>
                        <p className='main-text font-normal text-accent'>It also gives you, as the business owner and service provider, authority over certain undesirable things that a consumer may do on your website. However, let&apos;s consider the specific reasons why business owners should always include a Terms and Conditions agreement on their website.</p>
                    </div>
                    <button className='bg-accent ms-auto py-4 px-[36px] text-lg text-contrast font-bold rounded-[8px]'>I Agree</button>
                </div>
            </div>
        </div>
    )
}

export default TermsAndConditionsPage