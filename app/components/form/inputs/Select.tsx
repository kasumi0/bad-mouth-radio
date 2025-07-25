import { useStepStore } from "@/app/stores/stepStore";
import styles from "../form.module.css";
import { formSchema } from "@/app/schemas/formSchema";
const { inputArea,question, buttons, stepArea } = styles;

export type SelectField = "voice" | "level" | "style" | "tone";

const OPTIONS_MAP = {
  voice: formSchema.shape.voice.options,
  level: formSchema.shape.level.options,
  style: formSchema.shape.style.options,
  tone: formSchema.shape.tone.options,
} as const;

const VOICE_LABEL_MAP: Record<string, string> = {
  alloy: "若い男性",
  ash: "ダミ声のおじさん",
  fable: "クールな男性",
  onyx: "イケオジ",
  nova: "聡明な女性",
  shimmer: "中性",
  sage: "エモーショナルな女性",
  coral: "不思議な少年",
};

type Props = {
  fieldName: SelectField;
  label: string;
};

export const Select = ({ fieldName, label }: Props) => {
  const { nextStep, prevStep } = useStepStore();
  const options = OPTIONS_MAP[fieldName];

  return (
    <div className={inputArea}>
      <fieldset>
        <legend className={question}>{label}にしますか？</legend>
        <div className={buttons}>
          {options.map((opt) => (
            <label key={opt}>
              <input type="radio" name={fieldName} value={opt} />
              {fieldName === "voice" ? VOICE_LABEL_MAP[opt] : opt}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={stepArea}>
        <button type="button" onClick={prevStep}>
          前に戻る
        </button>
        <button type="button" onClick={nextStep}>
          次に進む
        </button>
      </div>
    </div>
  );
};
