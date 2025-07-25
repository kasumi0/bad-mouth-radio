import { useActionState, useEffect } from "react";
import { Speak, SpeakState } from "@/app/actions/speak";
import { MultiSelect } from "./inputs/MultiSelect";
import { Select } from "./inputs/Select";
import { NotesInput } from "./inputs/NotesInput";
import {
  habitsOptions,
  personalityOptions,
  weaknessesOptions,
} from "@/app/data/options";
import { useStepStore } from "@/app/stores/stepStore";
import styles from "./form.module.css";
const { formArea, inner } = styles;

type Props = {
  setIsPending: (v: boolean) => void;
  setAudioBase64: (v: string | undefined) => void;
};

const initialState: SpeakState = { audioBase64: "" };

export const FormUI = ({ setIsPending, setAudioBase64 }: Props) => {
  const [state, formAction, isPending] = useActionState(Speak, initialState);
  const { currentStep: step } = useStepStore();

  useEffect(() => {
    setIsPending(isPending);
    setAudioBase64(state.audioBase64);
  }, [setIsPending, setAudioBase64, isPending, state.audioBase64]);

  return (
    <form action={formAction} className={formArea}>
      <div className={inner} style={{ translate: `0 ${step * -100}vh` }}>
        <MultiSelect
          fieldName="personality"
          label="性格"
          options={personalityOptions}
          isFirst
        />
        <MultiSelect
          fieldName="habits"
          label="悪いクセ"
          options={habitsOptions}
        />
        <MultiSelect
          fieldName="weaknesses"
          label="弱点やコンプレックス"
          options={weaknessesOptions}
        />
        <Select fieldName="voice" label="どの罵倒師" />
        <Select fieldName="level" label="どの程度の罵り具合" />
        <Select fieldName="style" label="どんな罵倒スタイル" />
        <Select fieldName="tone" label="どんな口調" />
        <NotesInput error={state.error} />
      </div>

    </form>
  );
};
