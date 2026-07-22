import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";

import { useState } from "react";
import QuestionSidebar from "./QuestionSidebar";

function QuestionHamburger({
  mode,
  questionsArr,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setAnswer,
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-wrap gap-2">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button className="m-2 bg-white text-black" size="lg">
              <GiHamburgerMenu />
            </Button>
          }
        />
        <SheetContent
          side="left"
          className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh] bg-slate-950"
        >
          <QuestionSidebar
            closeSheet={() => setOpen(false)}
            mode={mode}
            questionsArr={questionsArr}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setAnswer={setAnswer}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default QuestionHamburger;
