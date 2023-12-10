import React from "react";
import { Badge } from "@/components/ui/badge";
import { activitiesContext } from "@/context/message";

export default function ActivityBadge({ activity }: { activity: string }) {
  const { activities, setActivities } = activitiesContext();

  function addActivity() {
    if (activities.includes(activity)) {
      setActivities(activities.filter((a) => a !== activity));
    } else {
      setActivities([...activities, activity]);
    }
  }
  return (
    <Badge
      className=" w-min select-none hover:cursor-pointer whitespace-nowrap text-lg"
      onClick={() => addActivity()}
      variant={activities.includes(activity) ? "default" : "secondary"}
    >
      {activity}
    </Badge>
  );
}
