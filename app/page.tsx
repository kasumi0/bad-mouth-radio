"use client";

import { useState } from "react";
import { FormUI } from "./components/form/FormUI";
import { Loading } from "./components/loading/Loading";
import { Play } from "./components/play/Play";
import { useStepStore } from "./stores/stepStore";

export default function Page() {
  const [audioBase64, setAudioBase64] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);
  const goToStep = useStepStore((state) => state.goToStep);

  const handleReset = () => {
    goToStep(0);
    setAudioBase64(undefined);
  };

  return (
    <main>
      {audioBase64 ? (
        <Play audioBase64={audioBase64} onReset={handleReset} />
      ) : (
        <FormUI setAudioBase64={setAudioBase64} setIsPending={setIsPending} />
      )}
      {isPending && <Loading />}
    </main>
  );
}
