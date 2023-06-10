import * as React from "react";

type Props = {
  image: {
    url: string;
  };
  width?: number;
  height?: number;
  className?: string;
};

export default function Image({
  image,
  width,
  height,
  className,
}: Props): React.ReactElement | null {
  if (image == null) {
    return null;
  }
  return (
    <img
      alt=""
      key={image.url}
      src={image.url}
      width={width}
      height={height}
      className={className}
    />
  );
}
