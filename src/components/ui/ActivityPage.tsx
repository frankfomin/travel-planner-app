"use client";
import { Checkbox } from "@/components/ui/checkbox";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { dataToApi } from "@/context/message";
import { Button } from "./button";
import { useRouter } from "next/navigation";
const activityCategories = [
  {
    category: "Sightseeing & Culture",
    choices: ["Historical Sites", "Museums", "Art Galleries", "Landmarks"],
  },
  {
    category: "Outdoor Activities",
    choices: ["Hiking", "Cycling", "Nature Walks", "Picnics"],
  },
  {
    category: "Dining & Cuisine",
    choices: ["Fine Dining", "Local Cuisine", "Street Food", "Cafes"],
  },
  {
    category: "Nightlife & Entertainment",
    choices: ["Nightclubs", "Live Music", "Theater", "Comedy Shows"],
  },
  {
    category: "Shopping & Markets",
    choices: ["Boutiques", "Markets", "Souvenir Shops", "Antiques"],
  },
  {
    category: "Relaxation & Wellness",
    choices: ["Spas", "Yoga & Meditation", "Beaches", "Parks"],
  },
  {
    category: "Sports & Recreation",
    choices: ["Sports Events", "Water Sports", "Adventure Sports", "Golf"],
  },
  {
    category: "Learning & Workshops",
    choices: [
      "Workshops",
      "Cultural Classes",
      "Cooking Classes",
      "Language Classes",
    ],
  },
  /*   {
    category: "Extra Adventure",
    choices: ["Surprise Me!"],
  }, */
];

export default function ActivityPage() {
  const router = useRouter();
  const { setActivities, activities, setIsSubmitted } = dataToApi();
  function handleChange(activity: string) {
    setActivities([...activities, activity]);
  }

  return (
    <section className="flex flex-col gap-10 mt-24">
      <div className="flex flex-col items-center text-9xl font-semibold">
        <div className="flex gap-5 items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="currentColor"
            className="w-36 h-36"
          >
            <mask
              id="mask0_7_52"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="25"
              height="25"
            >
              <rect
                x="0.0665283"
                y="0.676758"
                width="24"
                height="24"
                fill="currentColor"
              />
            </mask>
            <g mask="url(#mask0_7_52)">
              <path
                d="M12.0665 22.6768C10.6999 22.6768 9.4082 22.4143 8.19153 21.8893C6.97486 21.3643 5.91236 20.6476 5.00403 19.7393C4.0957 18.8309 3.37903 17.7684 2.85403 16.5518C2.32903 15.3351 2.06653 14.0434 2.06653 12.6768C2.06653 11.2934 2.32903 9.99759 2.85403 8.78926C3.37903 7.58092 4.0957 6.52259 5.00403 5.61426C5.91236 4.70592 6.97486 3.98926 8.19153 3.46426C9.4082 2.93926 10.6999 2.67676 12.0665 2.67676C13.4499 2.67676 14.7457 2.93926 15.954 3.46426C17.1624 3.98926 18.2207 4.70592 19.129 5.61426C20.0374 6.52259 20.754 7.58092 21.279 8.78926C21.804 9.99759 22.0665 11.2934 22.0665 12.6768C22.0665 14.0434 21.804 15.3351 21.279 16.5518C20.754 17.7684 20.0374 18.8309 19.129 19.7393C18.2207 20.6476 17.1624 21.3643 15.954 21.8893C14.7457 22.4143 13.4499 22.6768 12.0665 22.6768ZM12.0665 20.6268C12.4999 20.0268 12.8749 19.4018 13.1915 18.7518C13.5082 18.1018 13.7665 17.4101 13.9665 16.6768H10.1665C10.3665 17.4101 10.6249 18.1018 10.9415 18.7518C11.2582 19.4018 11.6332 20.0268 12.0665 20.6268ZM9.46653 20.2268C9.16653 19.6768 8.90403 19.1059 8.67903 18.5143C8.45403 17.9226 8.26653 17.3101 8.11653 16.6768H5.16653C5.64986 17.5101 6.25403 18.2351 6.97903 18.8518C7.70403 19.4684 8.5332 19.9268 9.46653 20.2268ZM14.6665 20.2268C15.5999 19.9268 16.429 19.4684 17.154 18.8518C17.879 18.2351 18.4832 17.5101 18.9665 16.6768H16.0165C15.8665 17.3101 15.679 17.9226 15.454 18.5143C15.229 19.1059 14.9665 19.6768 14.6665 20.2268ZM4.31653 14.6768H7.71653C7.66653 14.3434 7.62903 14.0143 7.60403 13.6893C7.57903 13.3643 7.56653 13.0268 7.56653 12.6768C7.56653 12.3268 7.57903 11.9893 7.60403 11.6643C7.62903 11.3393 7.66653 11.0101 7.71653 10.6768H4.31653C4.23319 11.0101 4.17069 11.3393 4.12903 11.6643C4.08736 11.9893 4.06653 12.3268 4.06653 12.6768C4.06653 13.0268 4.08736 13.3643 4.12903 13.6893C4.17069 14.0143 4.23319 14.3434 4.31653 14.6768ZM9.71653 14.6768H14.4165C14.4665 14.3434 14.504 14.0143 14.529 13.6893C14.554 13.3643 14.5665 13.0268 14.5665 12.6768C14.5665 12.3268 14.554 11.9893 14.529 11.6643C14.504 11.3393 14.4665 11.0101 14.4165 10.6768H9.71653C9.66653 11.0101 9.62903 11.3393 9.60403 11.6643C9.57903 11.9893 9.56653 12.3268 9.56653 12.6768C9.56653 13.0268 9.57903 13.3643 9.60403 13.6893C9.62903 14.0143 9.66653 14.3434 9.71653 14.6768ZM16.4165 14.6768H19.8165C19.8999 14.3434 19.9624 14.0143 20.004 13.6893C20.0457 13.3643 20.0665 13.0268 20.0665 12.6768C20.0665 12.3268 20.0457 11.9893 20.004 11.6643C19.9624 11.3393 19.8999 11.0101 19.8165 10.6768H16.4165C16.4665 11.0101 16.504 11.3393 16.529 11.6643C16.554 11.9893 16.5665 12.3268 16.5665 12.6768C16.5665 13.0268 16.554 13.3643 16.529 13.6893C16.504 14.0143 16.4665 14.3434 16.4165 14.6768ZM16.0165 8.67676H18.9665C18.4832 7.84342 17.879 7.11842 17.154 6.50176C16.429 5.88509 15.5999 5.42676 14.6665 5.12676C14.9665 5.67676 15.229 6.24759 15.454 6.83926C15.679 7.43092 15.8665 8.04342 16.0165 8.67676ZM10.1665 8.67676H13.9665C13.7665 7.94342 13.5082 7.25176 13.1915 6.60176C12.8749 5.95176 12.4999 5.32676 12.0665 4.72676C11.6332 5.32676 11.2582 5.95176 10.9415 6.60176C10.6249 7.25176 10.3665 7.94342 10.1665 8.67676ZM5.16653 8.67676H8.11653C8.26653 8.04342 8.45403 7.43092 8.67903 6.83926C8.90403 6.24759 9.16653 5.67676 9.46653 5.12676C8.5332 5.42676 7.70403 5.88509 6.97903 6.50176C6.25403 7.11842 5.64986 7.84342 5.16653 8.67676Z"
                fill="currentColor"
              />
            </g>
          </svg>
          <h1>Let&apos;s</h1>
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80"
            width={175}
            height={200}
            alt="beach"
            className="rounded-md object-cover border-[1px] border-[#030712]"
          />
          <span>Plan</span>
        </div>
        <div className="flex items-center gap-5">
          <span>Your</span>
          <Image
            src="https://images.unsplash.com/photo-1528543606781-2f6e6857f318?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2001&q=80"
            width={100}
            height={100}
            alt="beach"
            className="rounded-md border-[1px] border-[#030712]"
          />
          <span>Adventure!</span>
        </div>
        <h3 className="text-2xl opacity-60 font-normal">
          Choose as many as you&apos;d like, and feel free to add an extra
          option if you&apos;re feeling extra adventurous!
        </h3>
      </div>

      <div className="flex justify-center">
        <div className=" grid grid-cols-4 gap-4 ">
          {activityCategories.map((activity, i) => (
            <Card key={i} className="p-5 flex flex-col gap-3 shadow-lg">
              <div className="flex justify-between gap-5">
                <CardTitle>{activity.category}</CardTitle>
                <CardTitle>Icon</CardTitle>
              </div>
              {activity.choices.map((activity, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Checkbox onCheckedChange={() => handleChange(activity)} />
                  <label>{activity}</label>
                </div>
              ))}
            </Card>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={() => router.push("/loading")}>Button</Button>
      </div>
    </section>
  );
}
