import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      <a
        href="https://www.facebook.com/share/19nG2ddfuU/?mibextid=wwXIfr"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Facebook in a new tab"
        className="inline-flex items-center gap-2 px-2 py-2 rounded-full shadow-lg transition-transform duration-150 text-black/50 transform hover:-translate-y-1 hover:text-black"
      >
        <FaFacebookF className="w-5 h-5 " />
      </a>

      <a
        href="https://www.instagram.com/idealjewellerofficial?igsh=MWVwd2h1aG9rOWlwNw%3D%3D&utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Instagram in a new tab"
        className="inline-flex items-center gap-2 px-2 py-2 rounded-full shadow-lg text-black/50 transition-transform  duration-150 transform hover:-translate-y-1 hover:text-black"
      >
        <FaInstagram className="w-5 h-5" />
      </a>
    </div>
  );
}
