function WhatWeDo() {
  return (
    <>
      <section className="max-w-[1440px] mx-auto px-2 md:px-5 lg:px-10">
        <h2 className="text-4xl font-bold text-center my-8">Usage</h2>
        <article className="grid grid-cols-12  gap-y-8 md:gap-8 lg:gap-16">
          {/* Single Card */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            {/* Number */}
            <div className="flex justify-center">
              <div className="w-[50px] h-[50px] bg-cyan-500 text-white rounded-full flex justify-center items-center">
                <p className="text-xl">1</p>
              </div>
            </div>
            {/* End of Number */}
            <article>
              <h3 className="text-xl font-semibold text-center my-4">
                Report Items You&apos;ve Lost
              </h3>
              <p className="text-justify">
                You can report any lost item you want. Select a category,
                approximate location, description, perhaps a photo etc. would be
                nice.
              </p>
            </article>
          </div>
          {/* Single Card */}
          <div className="col-span-12 lg:col-span-4 md:col-span-6">
            {/* Number */}
            <div className="flex justify-center">
              <div className="w-[50px] h-[50px] bg-cyan-500 text-white rounded-full flex justify-center items-center">
                <p className="text-xl">2</p>
              </div>
            </div>
            {/* End of Number */}
            <article>
              <h3 className="text-xl font-semibold text-center my-4">
                Report Found Items
              </h3>
              <p className="text-justify">
                Directly post items you{"'"}ve found that is not yours by going
                to {'"'}Report Found{'"'} section. declare a lost item is found
                by clicking the {'"'}Report Found{'"'} button in a lost item
                page.
              </p>
            </article>
          </div>
          {/* Single Card */}
          <div className="col-start-auto col-span-12 md:col-start-4 lg:col-start-auto lg:col-span-4 md:col-span-6">
            {/* Number */}
            <div className="flex justify-center">
              <div className="w-[50px] h-[50px] bg-cyan-500 text-white rounded-full flex justify-center items-center">
                <p className="text-xl">3</p>
              </div>
            </div>
            {/* End of Number */}
            <article>
              <h3 className="text-xl font-semibold text-center my-4">
                Claim Items If Found
              </h3>
              <p className="text-justify">
                Only Found items can be claimed by anyone. Please, provide
                necessary proof to claim your item. Only the founder of the item
                can decide how to resolve a claim.
              </p>
            </article>
          </div>
        </article>
      </section>
    </>
  );
}

export default WhatWeDo;
