import Image from "next/image";
import { CgRing } from "react-icons/cg";
import Link from "next/link";
import CollectionSlider from "@/components/SwiperSlider";
export default function Home() {
  return (
    <>
      <section className="relative w-full h-lvh ">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/bg1.png"
            alt="background"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "top bottom" }}
          />
        </div>

        <div className="relative z-20 container  mx-auto p-24 flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-bold">Discover Timeless Elegance</h1>
          <p className="mt-4 text-lg text-black/50">
            Handcrafted jewellery designed to last a lifetime.
          </p>
          <Link
            href={"/products"}
            className="items-center flex justify-center rounded-md gap-2 mt-4 p-2 font-medium bg-transparent border border-silver text-black"
          >
            <CgRing></CgRing>
            View Collections
          </Link>
        </div>
      </section>
      <section
        className="relative w-full  min-h-[60vh] py-24 bg-offwhite"
        aria-labelledby="about-heading"
      >
        <div className="container mx-auto px-16">
          <div className="grid grid-cols-1 md:grid-cols-2  items-center">
            <div>
              <h2
                id="about-heading"
                className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-center"
                style={{
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "0.4px",
                }}
              >
                About Us - Since 1998
              </h2>
              <h2
                id="about-heading"
                className="text-3xl md:text-4xl font-bold leading-tight mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "0.4px",
                }}
              >
                Crafted for Moments That Last
              </h2>

              <p
                className="text-base md:text-lg text-gray-700 mb-6"
                style={{ fontFamily: "var(--font-body)" }}
              >
                At <span className="font-semibold">Ideal Jewellers</span>, every
                piece is a story designed with timeless aesthetics and crafted
                with meticulous attention to detail. We blend traditional
                techniques with modern sensibilities to create jewellery that
                becomes part of your legacy.
              </p>

              <p className="text-sm text-gray-600 mb-6">
                From ethically sourced materials to hand-finished details, our
                commitment is to quality, honesty and pieces you’ll treasure
                forever.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={"/gallery"}
                  className="items-center flex justify-center rounded-md gap-2 mt-4 p-2 font-medium bg-transparent border border-silver text-black"
                >
                  <CgRing></CgRing>
                  View Gallery
                </Link>
                <Link
                  href={"/contact"}
                  className="items-center flex justify-center rounded-md gap-2 mt-4 p-2 font-medium bg-transparent border border-silver text-black"
                >
                  <CgRing></CgRing>
                  Book Appointment
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                alt="Gold ring"
                src="/images/aboutUs.jpeg" // <- include file extension
                width={380} // choose appropriate values
                height={440}
                sizes="(max-width: 640px) 100vw, 25vw"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>{" "}
      <section
        className="relative w-full py-24"
        aria-labelledby="about-heading"
      >
        <div className="container mx-auto px-16">
          <div>
            <h2
              id="about-heading"
              className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-center"
              style={{
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.4px",
              }}
            >
              Our Collections
            </h2>
            <h2
              id="about-heading"
              className="text-xl  text-black/50 font-semibold leading-tight mb-4 text-center"
              style={{
                fontFamily: "var(--font-body)",
                letterSpacing: "0.4px",
              }}
            >
              Premium Gold and Silver Jewellery
            </h2>
          </div>
          <CollectionSlider />
        </div>
      </section>
    </>
  );
}
