import { ReactSVG } from "react-svg";

export default function Icon({  className, icon, title }: { className?: string; icon?: string; title?: string }) {
  if (!icon) {
    return null;
  }
  if (icon === "close-circle-line") {
    return (
      <ReactSVG src={`icons/${icon}`} className={className} title={title} />
    );
  } 
}
