"use client";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const Sidebar = () => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const navigateToStep = (index: number, step: string) => {
    if (index > activeStep) {
      setActiveStep(index);
      // Using the router to navigate to the step's path
      const navigateToStep = (
        index: number,
        step: { name: string; path: string },
      ) => {
        if (index > activeStep) {
          setActiveStep(index);
          router.push(step.path);
        }
      };
    }
  };

  return (
    <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
    </ul>
  );
};

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        
      <nav aria-label="breadcrumbs">
        <ol className="breadcrumb">
        </ol>
      </nav>
      <div className="drawer-content flex flex-col">
        {/* Main page content */}
        {children}
      </div>
      <div className="drawer-side">
        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
};
export default PageLayout;
