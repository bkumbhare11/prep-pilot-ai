/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import { BsStars } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { showError } from "@/utils/toast";
import { createSessionSchema } from "@/validators/sessionValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSession } from "@/services/sessionService";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { getErrorMessage } from "@/utils/errorHandler";
import { Loader } from "lucide-react";

function NewSession() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const modeName = searchParams.get("mode");
  const [mode, setMode] = useState("practice");
  const [inputVal, setInputVal] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      mode,
      difficulty: "easy",
      questionType: "mixed",
      questionCount: "5",
      experienceLevel: "fresher",
    },
  });

  useEffect(() => {
    if (modeName) {
      setMode(modeName);
      setValue("mode", modeName);
    }
  }, [modeName, setValue]);

  async function sessionData(data) {
    try {
      let formData;

      if (items.length === 0) {
        showError("Enter at least one topic");
        return;
      }

      if (mode === "practice") {
        let topics = items;
        formData = { ...data, topics };
        delete formData.role;
      } else {
        let techStack = items;
        formData = { ...data, techStack };
        delete formData.title;
      }

      setLoading(true);

      let res = await createSession(formData);
      console.log(res);
      let sessionId = res.data.session._id;
      navigate(`/session/${sessionId}`);
    } catch (error) {
      showError(getErrorMessage(error));
    } finally {
      setLoading(false);
      reset();
    }
  }

  function handleModeChange(newMode) {
    setMode(newMode);
    setValue("mode", newMode);
    setInputVal("");
    setItems([]);
  }

  function handleAdd(e) {
    e.preventDefault();
    if (
      inputVal.trim() === "" ||
      items.includes(inputVal.toLowerCase().trim())
    ) {
      showError("Already Exists!!");
      return;
    }

    setItems((prev) => [...prev, inputVal.toLowerCase().trim()]);

    setInputVal("");
  }

  function removeItem(itemToRemove) {
    setItems((prev) => prev.filter((item) => item !== itemToRemove));
  }

  return (
    <>
      {loading ? (
        <Loader type="create" />
      ) : (
        <div className="space-y-10">
          <PageHeader
            title="Setup AI Session"
            subtitle="Select your focus area and difficulty to begin your real-time assessment."
            icon={<BsStars />}
            iconStyles="text-yellow-400 animate-pulse"
          />

          <div className="border p-4 rounded-xl bg-slate-900 border-slate-800/80 max-w-3xl mx-auto">
            <div className="flex gap-5">
              <button
                className={`${mode === "practice" ? "bg-green-700" : "bg-slate-950/40"} flex-1 text-xs sm:text-sm font-medium px-2 sm:py-2.5 border border-slate-800 rounded-lg hover:bg-green-700 active:scale-95 cursor-pointer transition-all`}
                onClick={() => handleModeChange("practice")}
              >
                Practice Mode
              </button>
              <button
                className={`${mode === "interview" ? "bg-violet-500" : "bg-slate-950/40"} flex-1 text-xs sm:text-sm font-medium px-2 py-1.5 sm:py-2.5 bg-slate-900/40 border border-slate-800 rounded-lg  hover:bg-violet-500 active:scale-95 cursor-pointer transition-all`}
                onClick={() => handleModeChange("interview")}
              >
                Interview Mode
              </button>
            </div>

            <form className="mt-10" onSubmit={handleSubmit(sessionData)}>
              <input type="hidden" {...register("mode")} />
              <div className="flex flex-col gap-6">
                {mode === "practice" && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        type="text"
                        placeholder="e.g. React Hook Practice"
                        className="h-10 text-sm bg-slate-950/40"
                        {...register("title")}
                      />
                      {errors.title && (
                        <p className="text-xs text-red-500 font-medium mt-1">
                          {errors.title.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="topics">Topics to Focus</Label>
                      <div className="flex gap-2.5">
                        <Input
                          id="topics"
                          type="text"
                          placeholder="e.g. MS Excel, Accounting, Redux, JavaScript"
                          className="h-10 text-sm bg-slate-950/40"
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                        />
                        <button
                          className="bg-white text-black  px-4 text-xs sm:text-xs font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
                          onClick={handleAdd}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {mode === "interview" && (
                  <>
                    <div className="grid gap-2">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        type="text"
                        placeholder="Frontend Developer"
                        className="h-10 text-sm"
                        {...register("role")}
                      />
                      {errors.role && (
                        <p className="text-xs text-red-500 font-medium mt-1">
                          {errors.role.message}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="techStack">Tech Stack</Label>
                      <div className="flex gap-2.5">
                        <Input
                          id="techStack"
                          type="text"
                          placeholder="e.g. Reactjs, html, css"
                          className="h-10 text-sm"
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                        />
                        <button
                          className="bg-white text-black  px-4 text-xs font-semibold rounded-lg hover:bg-slate-200 cursor-pointer"
                          onClick={handleAdd}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex flex-wrap gap-3.5">
                  {items.length > 0 &&
                    items.map((item) => (
                      <div
                        key={item}
                        className={`${mode === "practice" ? "bg-green-600" : "bg-violet-600"} py-1 w-fit px-1.5 rounded-sm text-xs font-semibold flex items-center gap-2.5`}
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => removeItem(item)}
                          className="p-1.5"
                        >
                          <RxCross2 />
                        </button>
                      </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2 flex-1">
                    <Label htmlFor="difficulty" className="text-sm font-medium">
                      Difficulty
                    </Label>

                    <Controller
                      name="difficulty"
                      defaultValue="easy"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-wrap gap-4 mt-1"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="easy" id="easy" />
                            <Label htmlFor="easy">Easy</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="medium" id="medium" />
                            <Label htmlFor="medium">Medium</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="hard" id="hard" />
                            <Label htmlFor="hard">Mixed</Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>

                  <div className="grid gap-2 flex-1">
                    <Label
                      htmlFor="questionType"
                      className="text-sm font-medium"
                    >
                      Question Type
                    </Label>

                    <Controller
                      name="questionType"
                      control={control}
                      defaultValue="mixed"
                      render={({ field }) => (
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-wrap gap-4 mt-1"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="mcq" id="mcq" />
                            <Label htmlFor="mcq" className="cursor-pointer">
                              MCQ
                            </Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="theory" id="theory" />
                            <Label htmlFor="theory" className="cursor-pointer">
                              Theory
                            </Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="mixed" id="mixed" />
                            <Label htmlFor="mixed" className="cursor-pointer">
                              Mixed
                            </Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 border-t border-slate-900 pt-4">
                  <div className="grid gap-2 flex-1">
                    <Label
                      htmlFor="questionCount"
                      className="text-sm font-medium"
                    >
                      Question Count
                    </Label>

                    <Controller
                      name="questionCount"
                      control={control}
                      defaultValue="5"
                      render={({ field }) => (
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-wrap gap-4 mt-1"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="5" id="5" />
                            <Label htmlFor="5">5</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="10" id="10" />
                            <Label htmlFor="10">10</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="15" id="15" />
                            <Label htmlFor="15">15</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="20" id="20" />
                            <Label htmlFor="20">20</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="25" id="25" />
                            <Label htmlFor="25">25</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="30" id="30" />
                            <Label htmlFor="30">30</Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>

                  <div className="grid gap-2 flex-1">
                    <Label
                      htmlFor="experienceLevel"
                      className="text-sm font-medium"
                    >
                      Experience Level
                    </Label>

                    <Controller
                      name="experienceLevel"
                      defaultValue="fresher"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-wrap gap-4 mt-1"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="fresher" id="fresher" />
                            <Label htmlFor="fresher">Fresher</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="junior" id="junior" />
                            <Label htmlFor="junior">Junior Level</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="mid" id="mid" />
                            <Label htmlFor="mid">Mid Level</Label>
                          </div>
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="senior" id="senior" />
                            <Label htmlFor="senior">Senior Level</Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 mt-4 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 active:scale-95 cursor-pointer text-white ${
                    mode === "practice"
                      ? "bg-green-600 hover:bg-green-700 shadow-md shadow-green-600/5"
                      : "bg-violet-600 hover:bg-violet-700 shadow-md shadow-violet-600/5"
                  }`}
                >
                  Create AI{" "}
                  {mode === "practice"
                    ? "Practice Session"
                    : "Interview Session"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default NewSession;
