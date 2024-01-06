import React from "react";
import Buttons from "./Buttons";

export default function FormPage({
  children,
  title,
  subTitle,
  hidden = false,
}: {
  hidden?: boolean;
  children: React.ReactNode;
  title: string;
  subTitle: string;
}) {
  return (
    <section
      className={`flex flex-col gap-10 p-3 justify-center items-center ${
        hidden ? "hidden" : ""
      }`}
    >
      <div className="flex flex-col gap-5">
        <div className="grid gap-2">
          <h2 className="text-4xl font-semibold">{title}</h2>
          <h3 className="text-2xl text-muted-foreground">{subTitle}</h3>
        </div>
        <div className="flex gap-10">{children}</div>
      </div>
    </section>
  );
}
