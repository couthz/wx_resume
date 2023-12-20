import { Outlet } from "react-router-dom";
import { DialogProvider } from "./dialog";
import { TooltipProvider } from "@reactive-resume/ui";
import { helmetContext } from "../constants/helmet";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../libs/query-client";
import { LocaleProvider } from "./locale";
import { Toaster } from "./toaster";

export const Providers = () => (
  <LocaleProvider>

  <HelmetProvider context={helmetContext}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={0} skipDelayDuration={1000}>
        <DialogProvider>
          <Outlet />

          <Toaster />
        </DialogProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
  </LocaleProvider>
);
