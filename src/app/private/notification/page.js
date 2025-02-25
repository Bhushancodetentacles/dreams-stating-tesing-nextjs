"use client";
import Table from '@/app/components/VTable';
import { ArrowLeft, ArrowRight, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

function NotificationPage() {
    const [notificationData] = useState([
        {
            id: 1,
            title: "New property added in Miami, FL.",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            time: "2 hours ago",
            icon: "/images/home.webp",
            actionText: "Explore More",
            actionLink: "/property"
        },
        {
            id: 2,
            title: "New property added in Miami, FL.",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            time: "2 hours ago",
            icon: "/images/home.webp",
            actionText: "Explore More",
            actionLink: "/property"
        },
        {
            id: 3,
            title: "Logged in Successfully!",
            description: "You have successfully logged into your account.",
            time: "2 hours ago",
            icon: "https://via.placeholder.com/50", // Example icon URL
        },
    ]);

    return (
        <div className="bg-background px-[10px] md:px-[60px] py-[24px] min-h-screen">
            <section id="notification" className="flex flex-col gap-[42px]">
                <div className=''>
                    <div className='flex flex-col gap-[24px]'>
                        <div className='flex flex-col gap-4 md:flex-row justify-between items-start md:items-center'>
                            <h2 className='text-xl md:text-2xl text-accent font-semibold main-text flex items-center gap-4'><Link href='/dashboard'><ArrowLeft  color='#3F2762' className='cursor-pointer text-accent' size={32} /></Link> Notifications</h2>
                            <input
                                type="text"
                                placeholder="Search"
                                className="main-text font-medium text-sm border text-accent border-accent rounded-[8px] p-3 w-[267px] bg-transparent outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* notification list section */}
                <div className="flex flex-col gap-6">
                    {notificationData.map((notification) => (
                        <div key={notification.id} className="shadow-hover p-4 border-b border-accent">
                            <div className="flex items-start">
                                <Image src={notification.icon} alt="notification icon" className="mr-4 w-11 h-11" height={50}
                width={50} />
                                <div className="flex-grow flex flex-col gap-3.5">
                                    <div className='flex flex-col gap-2 md:flex-row md:items-center justify-between'>
                                        <h3 className="text-lg font-medium main-text text-accent"><span className="bg-[#0077FF] inline-block w-2 h-2 rounded-full mr-[7px]"></span>{notification.title}</h3>
                                        <p className='main-text text-xs'>2 hours ago.</p>
                                    </div>
                                    <p className="text-base text-xs">{notification.description}</p>
                                    {notification.actionLink && (
                                        <Link href={notification.actionLink} className="main-text text-sm font-semibold flex items-center gap-2 py-2 px-6 border border-accent rounded-full w-max hover:bg-accent hover:text-background">
                                            {notification.actionText} <ArrowRight  size={18} />
                                        </Link>
                                    )}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default NotificationPage;
