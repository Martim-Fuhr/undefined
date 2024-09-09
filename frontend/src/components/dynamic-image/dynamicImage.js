import Image from "next/image";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import mobileLogo from "../../../public/images/logo-mobile.png";
import desktopLogo from "../../../public/images/logo-desktop.png";

export default function DynamicImage() {
  const { isMobile } = useBreakpoints();

  return (
    <Image
      alt="imagem logo empresa"
      loading="lazy"
      height={isMobile ? 230 : 400}
      width={isMobile ? 230 : 300}
      src={isMobile ? mobileLogo : desktopLogo}
      className="flex"
    />
  );
}
