"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import { useApi } from "@/app/hooks/useApi";
import { ReadMore } from "@/app/components/ReadMore";
import Tooltip from "../../components/Tooltip";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";

const AvailablePropertiesPage = () => {
  const [loading, setLoading] = useState(false);
  const { get } = useApi();
  const [availableProperties, setAvailableProperties] = useState([]);
  const router = useRouter();

  const getAvailableProperties = async () => {
    try {
      setLoading(true);
      const result = await get("/available-property-lists?page=1&perPage=1000");
      setAvailableProperties(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getAvailableProperties();
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <div className="md:px-[60px] px-[10px] flex flex-col gap-[24px] py-8">
        <div className="flex justify-between flex-col md:flex-row md:items-center">
          <div className="flex gap-4 items-center text-accent">
            <ArrowLeft
              className="main-text cursor-pointer"
              size={32}
              onClick={() => history.go(-1)}
            />
            <h2 className="main-text text-xl md:text-2xl py-3 md:py-0 font-bold text-accent">
              Available Properties
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
          {availableProperties.map((item) => (
            <motion.div
              className="bg-contrast shadow-lg p-3 rounded-[24px] flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              key={item.propertyId}
            >
              <div className="rounded-t-[15px] w-full h-64 overflow-hidden">
                {/* Skeleton for image and actual image */}
                {loading ? (
                  <Skeleton height={200} className="rounded-t-[15px]" />
                ) : (
                  <div className="flex flex-col md:col-span-1 relative">
                    {/*========= badge -============= */}
                    <h5 className="badge">{item.propertyType}</h5>
                    <Image
                      src={
                        item.propertyImages.length > 0 &&
                        item.propertyImages[0].image
                      }
                      alt="Apartment 1"
                      className="rounded-t-[15px] w-full min-h-64 h-64 object-cover " 
                      height={60}
                      width={50}
                    />
                  </div>
                )}
              </div>

              <div className="py-4 px-3 flex flex-col justify-between gap-5">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    {/* Skeleton for title and actual title */}
                    {loading ? (
                      <Skeleton height={30} width="80%" />
                    ) : (
                      <h2 className="main-text text-xl md:text-2xl font-bold flex items-center justify-between w-full text-accent">
                        {item.propertyName}
                        {item.isSoldOut && (
                          <span className="flex items-center justify-center w-max h-max main-text text-base text-xs font-semibold py-1 rounded-full px-4 bg-[#FFB6C1] text-[#FF0000]">
                            Sold Out
                          </span>
                        )}
                      </h2>
                    )}

                    {/* Skeleton for location and actual location */}
                    {loading ? (
                      <Skeleton height={20} width="60%" />
                    ) : (
                      <p className="main-text text-[18px] font-medium text-accent break-words">
                        {item.location}
                      </p>
                    )}
                  </div>

                  {/* Skeleton for features and actual features */}
                  {loading ? (
                    <Skeleton count={3} />
                  ) : (
                    <p className="text-sm text-buttonhover font-medium break-words leading-relaxed">
                      <ReadMore
                        id="read-more-text"
                        text={item.features}
                        className="text-sm text-buttonhover font-medium break-words leading-relaxed"
                        amountOfChars={150}
                      />
                    </p>
                  )}

                  <div className="flex flex-col gap-[4px] md:gap-[24px]">
                    <div className="flex flex-col gap-2 md:gap-4 md:flex-row justify-between">
                      {/* Skeleton for Expected Returns and actual Expected Returns */}
                      {loading ? (
                        <Skeleton height={20} width="50%" />
                      ) : (
                        <p className="main-text text-buttonhover font-medium">
                          Expected Returns Per Share :{" "}
                          <span className="font-semibold text-accent">
                            ${item.expectedReturns} / month
                          </span>
                        </p>
                      )}

                      {/* Skeleton for Minimum Investment and actual Minimum Investment */}

                      {loading ? (
                        <Skeleton height={20} width="50%" />
                      ) : (
                        <p className="main-text text-buttonhover font-medium">
                          Total Quantity :{" "}
                          <span className="font-semibold text-accent">
                            {item.noOfToken}
                          </span>
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 md:gap-4 md:flex-row justify-between">
                      {/* Skeleton for Total Quantity and actual Total Quantity */}
                      {loading ? (
                        <Skeleton height={20} width="50%" />
                      ) : (
                        <p className="main-text text-buttonhover font-medium">
                          Minimum investment :{" "}
                          <span className="font-semibold text-accent">
                            ${item.pricePerToken}
                          </span>
                        </p>
                      )}

                      {/* Skeleton for Available Quantity and actual Available Quantity */}
                      {loading ? (
                        <Skeleton height={20} width="50%" />
                      ) : (
                        <p className="main-text text-buttonhover font-medium">
                          Available Quantity :
                          <span className="font-semibold text-accent">
                            {" "}
                            {item.availableTokens}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 w-full items-center justify-center">
                  
                      {loading ? <Skeleton variant="rectangular" height={58} width={200} className="w-full rounded-full" /> :
                        <Link
                          href={`/investor-property-details/${item.propertyId}`}
                          className="flex items-center justify-center w-full md:w-1/2 lg:w-2/3 xl:w-1/2 main-text text-accent font-semibold border border-accent group rounded-[31px] p-4 hover:bg-[#EDEAF3] hover:text-accent hover:border-[#EDEAF3] transition-all duration-300"
                        >
                          More Info
                        </Link>}
                      {loading ? <Skeleton variant="rectangular" height={58} width={200} className="w-full rounded-full" /> :
                        <button
                          onClick={() =>
                            item.availableTokens > 0 &&
                            router.push(
                              `/investor-property-details/${item.propertyId}`
                            )
                          }
                          disabled={item.availableTokens === 0}
                          className={`flex items-center justify-center w-full md:w-1/2 lg:w-2/3 xl:w-1/2 main-text font-semibold border rounded-[31px] p-4 transition-all duration-300 ${item.availableTokens === 0
                            ? "text-gray-500 bg-gray-300 border-gray-300 cursor-not-allowed"
                            : "text-contrast bg-accent border-accent hover:bg-[#51406b] hover:text-white"
                            }`}
                        >
                          {item.availableTokens === 0 ? (
                            <Tooltip
                              content={
                                <span className="text-white">
                                  This property is sold out
                                </span>
                              }
                            >
                              <span>Buy</span>
                            </Tooltip>
                          ) : (
                            <span>Buy</span>
                          )}
                        </button>}

                
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!loading && availableProperties.length === 0 && (
          <div className="text-center">
            <p className="text-lg font-bold text-accent">No Properties Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailablePropertiesPage;
