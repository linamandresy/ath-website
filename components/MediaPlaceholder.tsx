import { asset } from "@/lib/site-data";

type Props = {
  src?: string;
  alt: string;
  label?: string;
  eager?: boolean;
  light?: boolean;
};

function WireSvg() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M30 140 200 40l170 100z"
        stroke="#fff"
        strokeOpacity=".5"
        strokeWidth=".8"
      />
      <path d="M70 140v100h260V140" stroke="#263DAD" strokeWidth="1.2" />
      <path d="M50 240h300v24H50z" stroke="#43C65A" strokeWidth="1.2" />
      <path
        d="M200 40v200M70 190h260"
        stroke="#fff"
        strokeOpacity=".25"
        strokeDasharray="3 4"
      />
    </svg>
  );
}

export default function MediaPlaceholder({
  src,
  alt,
  label,
  eager,
  light,
}: Props) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={asset(src)} alt={alt} loading={eager ? "eager" : "lazy"} />
    );
  }

  return (
    <div
      className={`ph${light ? " l" : ""}`}
      role="img"
      aria-label={`${alt} (image de démonstration)`}
    >
      <WireSvg />
      <span>{label || "Image de démonstration"}</span>
    </div>
  );
}
