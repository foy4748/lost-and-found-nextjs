import Image from "next/image";

function AboutUs() {
  return (
    <>
      <section className="max-w-[1440px] mx-auto px-2 md:px-5 lg:px-10">
        <h2 className="text-4xl font-bold text-center my-8">About Us</h2>
        <div className="md:flex items-center">
          <article className="lg:w-1/2">
            <h3 className="text-4xl font-bold my-8">Our Mission</h3>
            <p className="text-justify">
              At FindMyLost, we believe in the power of community and technology
              to reunite people with their lost belongings. Our mission is to
              create a seamless and efficient platform where lost items can find
              their way back to their rightful owners.
            </p>
          </article>
          <figure className="my-8 md:my-0 lg:w-1/2 flex justify-center">
            <Image
              src={"/images/about-us/about-us-1.jpg"}
              width={234}
              height={300}
              alt="About Us"
            />
          </figure>
        </div>
        <div className="flex flex-col lg:flex-row items-center">
          <figure className="my-8 md:my-0 lg:w-1/2 flex justify-center">
            <Image
              src={"/images/about-us/about-us-2.jpg"}
              width={234}
              height={300}
              alt="About Us"
            />
          </figure>
          <article className="-order-1 lg:order-1 lg:w-1/2">
            <h3 className="text-4xl font-bold text-center my-8">Our Story</h3>
            <p className="text-justify">
              Founded in 2023, FindMyLost was born out of a simple yet powerful
              idea: to make the world a smaller place by connecting people with
              their lost items. Our founder, Jane Doe, experienced the
              frustration of losing a valuable item and realized there was a
              need for a better solution.{" "}
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
