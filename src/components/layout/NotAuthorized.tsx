import React from "react";
import { Typography } from "../ui/Typography";
import { Button } from "../ui/button";
import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from "./layout";

export const NotAuthorized = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <Typography variant="h1" className="text-center">
        Sorry, you are not authorized to view this page
      </Typography>
      <div className="flex flex-col items-center gap-4">
        <Typography variant="base" className="text-center">
          Please login or contact support.
        </Typography>
      </div>
      <div className="flex gap-4">
        <Button variant={"outline"}>Login</Button>
        <Button variant="outline">Contact support</Button>
      </div>
    </div>
  );
};
