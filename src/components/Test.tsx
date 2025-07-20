import { useEffect } from "react";
import Section from "./Section";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { generateClicksChartDataTemplate } from "@/lib/utils";

const Test = () => {
  useEffect(() => {
    toast("Test comp");
  });
  return (
    <Section className="justify-center items-center">
      TEST
      <Button
        onClick={() => {
          const template = generateClicksChartDataTemplate();
          console.log(template);
        }}
      >
        Generate TEmplate
      </Button>
    </Section>
  );
};

export default Test;
