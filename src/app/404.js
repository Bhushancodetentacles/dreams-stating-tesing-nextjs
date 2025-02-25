"use client";
import Link from 'next/link';
import React from 'react';

const Custom404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
            <Link href="/" className="mt-8 text-blue-600 hover:underline">Go Back Home</Link>
        </div>
    );
};

export default Custom404;
