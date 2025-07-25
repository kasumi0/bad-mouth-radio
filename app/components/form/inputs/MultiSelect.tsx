import { useStepStore } from "@/app/stores/stepStore";
import styles from "../form.module.css";
const { inputArea, question, buttons, stepArea } = styles;

type Props = {
  fieldName: string;
  label: string;
  options: string[];
  isFirst?: boolean;
};

export const MultiSelect = ({
  fieldName,
  label,
  options,
  isFirst = false,
}: Props) => {
  const { nextStep, prevStep } = useStepStore();

  return (
    <div className={inputArea}>
      <fieldset>
        <legend className={question}>あなたの{label}は？（複数選択可）</legend>
        <div className={buttons}>
          {options.map((opt) => (
            <label key={opt}>
              <input type="checkbox" name={fieldName} value={opt} />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>
      <div className={stepArea}>
        {!isFirst && (
          <button type="button" onClick={prevStep}>
            前に戻る
          </button>
        )}
        <button type="button" onClick={nextStep}>
          次に進む
        </button>
      </div>
    </div>
  );
};
