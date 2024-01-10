"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const createBreadcrumbs = (pathname: string) => {
  const paths = pathname.split("/").filter((x) => x);
  const breadcrumbs = paths.map((path, index) => {
    // Reconstruct the path up to this point
    const href = "/" + paths.slice(0, index + 1).join("/");
    return { name: path.charAt(0).toUpperCase() + path.slice(1), href };
  });
  return breadcrumbs;
};

const steps = [
  { name: "Data", path: "/data" },
  { name: "Trainings", path: "/trainings" },
  { name: "Metrics", path: "/metrics" },
];

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
      {steps.map((step, index) => (
        <li key={step.name} className={index === activeStep ? "active" : ""}>
          <a
            onClick={() => navigateToStep(index, step.path)}
            className={
              index <= activeStep
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            }
          >
            {step.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const breadcrumbs = createBreadcrumbs(pathname);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumbs">
        <ol className="breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <li key={index}>
              {/* Don't link the last item */}
              {index < breadcrumbs.length - 1 ? (
                <a href={crumb.href}>{crumb.name}</a>
              ) : (
                <span>{crumb.name}</span>
              )}
            </li>
          ))}
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
