"use client"
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import React from "react";

const BuySecondaryTokens = () => {
  
  return (
    <div className="bg-background min-h-screen px-[10px] md:px-[60px] py-[24px] flex flex-col gap-[54px]">
      <section>
        <div className="flex flex-col gap-[24px]">
          <h2 className="main-text text-xl md:text-2xl font-semibold flex items-center gap-4 text-accent">
            {" "}
           <ArrowLeft className='main-text cursor-pointer' size={32} onClick={() => history.go(-1)} /> Buy Secondary Tokens
          </h2>
          <div className="flex flex-col lg:flex-row gap-[24px] w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] bg-contrast shadow-hover p-[24px] rounded-[24px] w-full lg:w-[80%]">
              <div className="flex flex-col gap-[24px] ">
               <Image
                  src="/images/details-img1.webp"
                  alt="Property Image"
                  className="rounded-[24px] "
                  height={50}
                width={50}
                />
                <div className="grid grid-cols-2  gap-[24px]">
                 <Image
                    src="/images/details-img2.webp"
                    alt="Property Image"
                    className="rounded-[24px] "
                    height={50}
                width={50}
                  />
                 <Image
                    src="/images/details-img3.webp"
                    alt="Property Image"
                    className="rounded-[24px] "
                    height={50}
                width={50}
                  />
                </div>
              </div>
              <div className="main-text flex flex-col gap-[32px] justify-center text-accent">
                <div className="flex flex-col gap-[24px]">
                  <h3 className="text-2xl font-bold text-accent">
                    SALFORD, MANCHESTER
                  </h3>
                  <p className="text-lg font-medium">Rental</p>
                  <p className="text-lg font-medium">
                    3 Bed Apartment 95m2 new build available for tokenised sell
                  </p>
                  <div className="text-sm font-medium">
                    <p>
                      An exclusive conclave of 9 luxury apartments set in the
                      leafy Leatherhead. Quietly nestled next to the beautiful
                      Surrey Hills, an area of outstanding natural beauty, and
                      just under a 7-minute walk to Leatherhead station that
                      arrives into London Victoria in just 45 minutes.
                    </p>
                    <p>
                      Fit with a private underground car park as well as other
                      superb amenities such as an immaculate communal garden
                      this development has been 75% completed with 25% of units
                      already sold off plan.{" "}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[24px]">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <p className="text-lg font-medium">Expected Returns :</p>
                    <p className="text-lg font-semibold">$234,950</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <p className="text-lg font-medium">Total Quantity : </p>
                    <p className="text-lg font-semibold">100</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <p className="text-lg font-medium">Minimum investment : </p>
                    <p className="text-lg font-semibold">$234,950</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <p className="text-lg font-medium">Available Quantity : </p>
                    <p className="text-lg font-semibold">25</p>
                  </div>
                </div>
                <div>
                  <p className="text-accent font-medium">
                    Tokenization progress tracker
                  </p>
                  <div className="flex items-center gap-5 mt-[10px]">
                    <div className="bg-graph rounded-[5px] overflow-hidden w-[90%] h-[10px]">
                      <div
                        className="bg-pink  rounded-[5px] "
                        style={{ width: "25%", height: "100%" }}
                      ></div>
                    </div>
                    <button className="text-xs font-semibold main-text text-accent bg-accentshade shadow-hover rounded-[8px] p-2">
                      25%
                    </button>
                  </div>
                </div>
                <button className="flex items-center justify-center mx-auto w-full md:w-1/2 main-text text-contrast border border-accent bg-accent hover:bg-background hover:text-accent hover:border hover:border-accent font-semibold btn-grad rounded-[31px] p-4">
                  Buy
                </button>
              </div>
            </div>
            <div className="w-full lg:w-[20%] flex flex-col gap-[36px]">
              <div className="w-full main-text text-contrast rounded-[24px] bg-accent shadow-hover hover:bg-buttonhover">
                <div className=" btn-grad p-4 rounded-[16px] flex  flex-col gap-[10px] w-full items-center ">
                  <p className="text-sm font-medium hover:font-bold">
                    Current Balance
                  </p>
                  <p className="text-[36px] font-bold">$23,786</p>
                </div>
              </div>
              <div className="w-full main-text flex flex-col gap-4 text-accent">
                <p className="text-sm font-medium p-2">Your Investment</p>
                <div className=" p-5 flex flex-col gap-[10px] grey-grad main-text items-center text-accent rounded-[24px] bg-accentshade shadow-hover">
                  <p className="text-sm font-medium">Property Count</p>
                  <p className="text-accent font-semibold">$23,786</p>
                </div>
                <div className=" p-5 flex flex-col gap-[10px] grey-grad main-text items-center text-accent rounded-[24px] bg-accentshade shadow-hover">
                  <p className="text-sm font-medium">Property Count</p>
                  <p className="text-accent font-semibold">$23,786</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuySecondaryTokens;
