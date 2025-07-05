import type { ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="mb-8 text-center">
      <span className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent pb-2 border-b-2 border-primary/20 inline-block">
        {children}
      </span>
    </h1>
  );
};

export default Title;
