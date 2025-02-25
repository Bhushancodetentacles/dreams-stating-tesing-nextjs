import React from 'react';

const BreadCrumbs = ({ title, breadcrumbs }) => {
  return (
    <div className="bg-[#EDEEF5] p-6 relative mt-[13%] md:mt-[7%] lg:mt-[5%] xl:mt-[4%] 2xl:mt-[3%]  mb-[2%]">
      <div className="container mx-auto lg:flex justify-between items-center">

        <h1 className="text-xl text-accent font-normal mb-2 lg:mb-0 hover:font-extrabold transition-all">
          {title}
        </h1>

        <nav className="breadcrumbs">
          <ol className="flex flex-wrap items-center justify-center list-none p-0 m-0 text-sm font-normal">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={index} className={breadcrumb.isCurrent ? 'text-accent font-bold' : ''}>
                {breadcrumb.isCurrent ? (
                  <span>{breadcrumb.name}</span>
                ) : (
                  <a href={breadcrumb.link} className="text-accent hover:text-accent">
                    {breadcrumb.name}
                  </a>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="text-accent mx-2">/</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default BreadCrumbs;
