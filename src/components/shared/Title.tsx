import type { ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="text-center text-5xl border-b max-w-max mx-auto my-4">
      {children}
    </h1>
  );
};

export default Title;
