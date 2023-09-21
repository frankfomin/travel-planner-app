import React from "react";

import { Progress } from "@nextui-org/react";

export default function ProgressBar() {
  return (
      <Progress
        isStriped
        aria-label="Loading..."
        size="md"
        value={50}
        className="max-w-md absolute mt-32 bg-slate-200 rounded-md "
      />
    
  );
}
