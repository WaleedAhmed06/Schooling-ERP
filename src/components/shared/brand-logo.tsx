import Image from "next/image";

export function BrandLogo() {
  return (
    <span className="brand-image-wrap">
      <Image
        src="https://processiqtech.com/assets/logo1-B0hYff3J.png"
        width={923}
        height={206}
        alt="Process IQ Tech"
        className="brand-image"
        unoptimized
        priority
      />
    </span>
  );
}
