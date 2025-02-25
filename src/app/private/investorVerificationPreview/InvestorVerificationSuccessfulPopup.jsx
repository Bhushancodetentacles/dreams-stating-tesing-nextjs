import Link from 'next/link'
import React from 'react'

const InvestorVerificationSuccessfulPopup = () => {
  return (
    <div className=' flex flex-col items-center justify-center gap-[43px] px-[42px]'>
        <div className='flex flex-col items-center justify-center gap-3'>
        <p className='text-2xl font-bold text-accent'>KYC Verified Successfully!</p>
        <p className='text-lg font-semibold text-accent'>Verification Successful</p>
        </div>
        <Link href="/profile" className='py-[10px] px-[32px] rounded-full btn-grad main-text text-base font-semibold text-contrast bg-accent hover:bg-buttonhover hover:text-contrast'>Back to Profile</Link>
    </div>
  )
}

export default InvestorVerificationSuccessfulPopup