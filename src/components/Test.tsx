import { useEffect } from "react";
import Section from "./Section";
import { toast } from "sonner";

const Test = () => {
  useEffect(() => {
    console.log("Test.tsx rendered");
    toast("Test comp")
  });
  return <Section className="justify-center items-center">TEST</Section>;
};

export default Test;
