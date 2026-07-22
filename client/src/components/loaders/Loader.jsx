import { useEffect, useState } from "react";
import { BsStars } from "react-icons/bs";
import { Loader2 } from "lucide-react";
import { IoIosRocket } from "react-icons/io";
import { BsFillBarChartFill } from "react-icons/bs";

const loadingMessages = {
  create: [
    "Structuring your assessment engine...",
    "Analyzing your tech-stack preferences...",
    "Calibrating question difficulty...",
    "Generating custom interview questions...",
    "Securing your practice playground...",
  ],
  enter: [
    "Connecting to your practice room...",
    "Setting up the compiler environment...",
    "Injecting code terminal configurations...",
    "Initializing timer and session rules...",
    "Syncing live interface components...",
  ],
  result: [
    "Collecting your response sheets...",
    "AI is evaluating your code structures...",
    "Calculating precision and correctness metrics...",
    "Compiling performance graphs...",
    "Generating personalized feedback logs...",
    "Preparing your final scorecard...",
  ],
  default: [
    "Processing your request...",
    "Optimizing data streams...",
    "Almost ready...",
  ],
};

const loaderConfig = {
  create: {
    title: "Preparing Your AI Session",
    icon: <BsStars className="text-3xl text-yellow-500 animate-pulse" />,
  },
  enter: {
    title: "Launching Your Session",
    icon: <IoIosRocket className="text-3xl text-orange-500 animate-pulse" />,
  },
  result: {
    title: "Analyzing Your Performance",
    icon: (
      <BsFillBarChartFill className="text-3xl text-purple-500 animate-pulse" />
    ),
  },
  default: {
    title: "Please Wait...",
    icon: <Loader2 className="text-3xl text-slate-400 animate-spin" />,
  },
};

function Loader({ type = "default" }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const currentMessage = loadingMessages[type] || loadingMessages.default;
  const config = loaderConfig[type] || loaderConfig.default;

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % currentMessage.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentMessage]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
          {config.icon}
        </div>

        <h2 className="mt-6 text-2xl font-semibold">{config.title}</h2>

        <p className="mt-3 text-slate-400 min-h-6 transition-all duration-300">
          {currentMessage[messageIndex]}
        </p>

        <Loader2 className="mx-auto mt-8 h-8 w-8 animate-spin text-blue-500" />

        <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-500" />
        </div>

        <p className="mt-4 text-xs text-slate-500">
          This usually takes 5–10 seconds.
        </p>

        <p className="mt-4 text-xs text-red-500">
          Please don't refresh or close this page.
        </p>
      </div>
    </div>
  );
}

export default Loader;
