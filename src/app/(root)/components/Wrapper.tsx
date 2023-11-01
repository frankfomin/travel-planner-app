"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import {
  dateContext,
  pageIndex,
  travellingWithContext,
} from "@/context/message";
import { toast } from "sonner";
import { z } from "zod";
import { saveDate } from "@/lib/actions/saveDate";
import { saveTravellingWith } from "@/lib/actions/travellingWith";

const schema = z.object({
  date: z.object({
    from: z.date().refine((d) => d > new Date(), {
      message: "Date should be in the future",
    }),
    to: z.date().refine((d) => d > new Date(), {
      message: "Date should be in the future",
    }),
  }),
});

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const { index, setIndex, prevIndex, setPrevIndex } = pageIndex();
  const { travellingWith } = travellingWithContext();
  const { date } = dateContext();
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (index > prevIndex) {
      if (prevIndex === 1 && !date) {
        setIndex(1);
        toast.error("Please select a date");
      } else if (prevIndex === 2 && !travellingWith) {
        setIndex(2);
        toast.error("Please select one of the options");
      } else {
        gsap.to(wrapperRef.current, {
          translateX: `-=${100}%`,
          duration: 0.1,
        });
      }
    }
    if (index < prevIndex) {
      if (prevIndex === 0) {
        return;
      }
      gsap.to(wrapperRef.current, {
        translateX: `+=${100}%`,
        duration: 0.1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <>
      <div className="flex items-center w-full z-50">
        {index !== 0 && (
          <svg
            onClick={() => {
              setPrevIndex(index), setIndex(index - 1);
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left w-12 h-12 hover:cursor-pointer absolute top-1/2 left-0"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        )}
        {index !== 3 && index !== 0 && (
          <svg
            onClick={async () => {
              if (prevIndex === 0 && date) {
                console.log(date);

                const data = {
                  date: {
                    from: date.from,
                    to: date.to,
                  },
                };

                const result = schema.safeParse(data);

                if (!result.success) {
                  toast.error("Parsing failed");
                  console.log(result.error);
                  return;
                }

                const res = await saveDate(result.data);

                if (res.error) {
                  toast.error(res.error);
                  return;
                }

                setPrevIndex(index);
                setIndex(index + 1);
              } else if (prevIndex === 1 && travellingWith) {
                const res = await saveTravellingWith(travellingWith);

                setPrevIndex(index);
                setIndex(index + 1);
              } else {
                setPrevIndex(index);
                setIndex(index + 1);
              }
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right w-12 h-12 hover:cursor-pointer absolute top-1/2 right-0"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        )}
      </div>
      <div ref={wrapperRef} className={`absolute w-full transition-all`}>
        {children}
      </div>
    </>
  );
}
