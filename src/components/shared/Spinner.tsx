import { Book } from "lucide-react";
import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`relative ${styles.spinnerContainer}`}>
        {/* Logo Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Book className="w-8 h-8 text-primary" strokeWidth={1.5} />
        </div>

        {/* Outer Spinner */}
        <div className="w-16 h-16 rounded-full relative">
          <div
            className={`absolute w-full h-full rounded-full border-4 border-transparent border-t-primary border-b-primary/30 ${styles.spinnerForward}`}
          />
        </div>

        {/* Inner Spinner */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full">
            <div
              className={`absolute w-full h-full rounded-full border-4 border-transparent border-t-primary/50 border-b-primary/10 ${styles.spinnerReverse}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
