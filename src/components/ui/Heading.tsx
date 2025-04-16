import { useFontSize } from "@/hooks/useFontSize";
import { getFontSizeWithOffset } from "@/utils/fontSize";

type HeadingProps = {
  children: React.ReactNode;
  sizeOffset: number;
  className?: string;
};

export const Heading = ({ sizeOffset, children, className = "" }: HeadingProps) => {
  const { fontSize } = useFontSize();
  const dynamicSize = getFontSizeWithOffset(fontSize, sizeOffset);
  return <h2 className={`${dynamicSize} ${className}`}>{children}</h2>;
};
