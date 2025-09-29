// Replace your single image container with this grid block
import Image from "next/image";

const IMAGES = [
  "/images/ring1.JPG",
  "/images/ring2.JPG",
  "/images/ring3.JPG",
  "/images/ring9.JPG",
  "/images/ring4.JPG",
  "/images/ring5.JPG",
  "/images/ring6.JPG",
  "/images/ring7.JPG",
  "/images/ring8.JPG",
];

export default function CatalogGrid() {
  return (
    <div className="overflow-hidden shadow-sm p-4">
      <div className="grid grid-cols-3 grid-rows-3 gap-4">
        {IMAGES.map((src, i) => (
          <div
            key={src}
            className="relative w-full aspect-[4/5] overflow-hidden "
          >
            <Image
              src={src}
              alt={`Gallery ${i + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, 25vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority={i < 3}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
