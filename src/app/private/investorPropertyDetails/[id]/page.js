"use client";

import React, { useState, useEffect } from "react";
import PropertiesSwiper from "@/app/components/PropertiesSwiper";
import VideoThumbnail from "@/app/components/VideoThumbnail";
import { useApi } from "@/app/hooks/useApi";
import { useParams } from "next/navigation";
import Popup from "@/app/components/Popup";
import BuyPropertyModel from "@/app/components/BuyPropertyModel";
import SumsubVerification from "@/app/components/SumsubVerification";
import { ArrowLeft } from "lucide-react";

function InvestorPropertyDetailsPage() {
  // Simulate API Hook
  const { get } = useApi();
  const { id } = useParams();
  // State variables
  const [property, setProperty] = useState({});
  const [isBuy, setIsBuy] = useState(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  const [hasKycDone, setHasKycDone] = useState(false);

  async function fetchData() {
    try {
      const response = await get(`/view-property/${id}`);
      setProperty(response);
    } catch (error) {
      console.log(error);
    }
  }

  const getKycStatus = async () => {
    try {
      const response = await get("/get-profile");
      setHasKycDone(response.investor.kycStatus);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getKycStatus();
  }, []);

  useEffect(() => {
    // Simulate API call
    fetchData();
  }, []);

  const handleInvest = () => {
    if (hasKycDone) {
      setIsBuy(true); // Proceed with the investment if KYC is done
    } else {
      setIsKycModalOpen(true); // Open the KYC modal if KYC is not done
    }
  };

  return (
    <>
      {isKycModalOpen && (
        <Popup
          open={true}
          closeIcon={true}
          onDialogClose={() => {
            setIsKycModalOpen(false);
            getKycStatus();
          }}
        >
          <SumsubVerification />
        </Popup>
      )}
      {isBuy && (
        <Popup
          open={true}
          closeIcon={true}
          onDialogClose={() => setIsBuy(false)}
        >
          <BuyPropertyModel
            apiCall={fetchData}
            data={property}
            onClose={() => setIsBuy(false)}
          />
        </Popup>
      )}
      {/* <Navbar /> */}
      <div className="main-content">
        <div className="py-6 px-16">
          <h2 className="main-text text-xl md:text-2xl font-normal flex items-center gap-4 text-accent">
            <ArrowLeft
              className="cursor-pointer"
              size={32}
              onClick={() => history.go(-1)}
            />{" "}
            Property Details{" "}
          </h2>
        </div>
        {/* <BreadCrumbs title="Property Details" breadcrumbs={breadcrumbs} /> */}
        <div className="container mx-auto px-4 my-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-3 md:col-span-2">
              <PropertiesSwiper images={property?.propertyImages || []} propertyTypeName={property.propertyTypeName} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-5 mt-4 items-start">
                <div>
                  <h2 className="text-accent hover:font-extrabold text-xl py-3 break-words">
                    Description
                  </h2>
                  <div className="text-buttonhover leading-relaxed break-words">
                    <p>{property?.propertyDescription}</p>
                  </div>
                </div>
                <div className="pt-6">
                  <VideoThumbnail videoLink={property?.videoLink} />
                </div>
              </div>

              <div className="" data-aos="fade-up" data-aos-delay="300">
                {/* <div
                                    className="break-words text-buttonhover"
                                    dangerouslySetInnerHTML={{
                                        __html: property?.propertyDetails,
                                    }}
                                ></div> */}
                <h2 className="text-accent hover:font-extrabold text-xl py-3 break-words">
                Why Invest in this Market?
                </h2>
                <div className="text-buttonhover leading-relaxed break-words">
                  <p>
                    The student property market represents a lucrative
                    investment opportunity right across the UK. Its safe to say
                    that the majority of students in higher education require
                    accommodation, and they crave modern, purpose-built, well
                    managed properties, which offer great access to their place
                    of study and local and national transport links The
                    University of Sheffield has approximately 28,000 students,
                    but can only provide around 6,000 students with a room in
                    one of its halls of residence. Similarly, Sheffield Hallam
                    can only accommodate around 4,500 of its 34,000 students in
                    its halls of residence Its easy to see that theres a
                    significant shortfall in supply of suitable student
                    accommodation. This gap in the market needs to be met by the
                    private sector, and this is increasingly being achieved with
                    purpose-built, fully fitted properties across the city.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-3 md:col-span-1">
              <h2 className="text-xl hover:font-extrabold text-accent mb-2 uppercase break-words">
                {property?.propertyName}
              </h2>
              <div className="transition-all ease-in-out duration-300 shadow-hover p-[30px]">
                <h2 className="text-xl hover:font-extrabold text-accent font-normal mb-4 border-b p-3">
                  Project information
                </h2>

                {/* Project Details */}
                <ul className="text-[15px] mb-6 space-y-2 leading-relaxed  text-accent break-words">
                  <li>
                    <span className="font-bold text-[15px]">Summary</span> :{" "}
                    {property?.summary}
                  </li>
                  <li>
                    <span className="font-bold text-[15px]">Value</span> : from
                    ${property?.totalInvestment}
                  </li>
                  <li>
                    <span className="font-bold text-[15px]">
                      Minimum Investment
                    </span>{" "}
                    : from ${property?.pricePerToken}
                  </li>
                  <li>
                    <span className="font-bold text-[15px]">Lease Length</span>{" "}
                    : {property?.leaseLength}
                    
                  </li>
                  {/* <li>
                    <span className="font-bold">Sells Restrictions</span> :{" "}
                    {property?.salesRestriciton}
                  </li> */}
                  <li>
                    <span className="font-bold text-[15px]">Yield</span> :{" "}
                    {property?.yieldPercentage}% rental yield
                  </li>
                  <li>
                    <span className="font-bold text-[15px]">
                      Completion Date
                    </span>{" "}
                    : {new Date(property?.completionDate).toDateString()}
                  </li>
                  <li>
                    <span className="font-bold text-[15px]">Address</span> :{" "}
                    {property?.location}
                  </li>
                  <li>
                    <span className="font-bold text-[15px]">
                      Further Details
                    </span>{" "}
                    :{" "}
                    <a
                      href={property?.pdf}
                      target="_blank"
                      className="underline"
                    >
                      Download Info Pack
                    </a>
                  </li>
                </ul>
              </div>
              <div className="py-5 my-5">
                {/* Tokenization Level */}
                <div className="mb-1">
                  <h3 className="text-accent text-xl mb-2 hover:font-extrabold">
                    Tokenization Level (Sold)
                  </h3>
                  <div className="relative w-[75%] m-auto bg-graph rounded-full h-5">
                    <div
                      className="bg-pink h-5 rounded-full"
                      style={{
                        width: `${property?.tokenizationPercentage}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-center mt-1 text-sm font-medium">
                    {property?.tokenizationPercentage}%
                  </p>
                </div>

                {/* Investment Available */}
                <div className="mb-1">
                  <h3 className="text-accent text-xl mb-2 hover:font-extrabold">
                    Investment Available
                  </h3>
                  <div className="relative w-[75%] m-auto bg-graph rounded-full h-5">
                    <div
                      className="bg-pink h-5 rounded-full"
                      style={{
                        width: `${
                          property &&
                          (property.remainingInvestemet /
                            property?.totalInvestment) *
                            100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-center mt-1 text-sm font-medium">
                    ${property?.remainingInvestemet}
                  </p>
                </div>

                {/* Guaranteed Yield */}
                <div className="mb-3">
                  <h3 className="text-accent text-xl mb-2 hover:font-extrabold">
                    Guaranteed Yield (p/a)
                  </h3>
                  <div className="relative w-[75%] m-auto bg-graph  rounded-full h-5">
                    <div
                      className="bg-pink h-5 rounded-full"
                      style={{ width: `${property?.yieldPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-center mt-1 text-sm font-medium">
                    {property?.yieldPercentage}%
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={handleInvest}
                    disabled={property?.availableToken === 0} // Disable the button if availableToken is 0
                    className={`bg-[#3a1456] text-white font-medium px-6 py-3 rounded-lg shadow-md transition duration-300 border border-accent  ${
                      property?.availableToken === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed" // Disabled state styles
                        : "hover:bg-transparent hover:text-accent " // Enabled state styles
                    }`}
                  >
                    Invest Now
                  </button>
                </div>
              </div>
              <div
                className="py-5 text-accent"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h2 className="text-accent hover:font-extrabold text-xl py-3 break-words">
                  Features
                </h2>
                <div
                  className="break-words property-list-features"
                  dangerouslySetInnerHTML={{ __html: property?.features }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default InvestorPropertyDetailsPage;
