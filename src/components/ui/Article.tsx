import cn from "@/utils/cn";
import React from "react";

export default function Article({
  className,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <article
      {...props}
      className={cn("prose dark:prose-invert px-4 sm:px-6 lg:px-8", className)}
    />
  );
}
