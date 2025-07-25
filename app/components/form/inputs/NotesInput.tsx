import { useStepStore } from "@/app/stores/stepStore";
import styles from "../form.module.css";
const { inputArea, question, stepArea, submitArea } = styles;

export const NotesInput = ({ error }: { error: string | undefined }) => {
  const { prevStep } = useStepStore();

  return (
    <div className={inputArea}>
      <div>
        <label className={question}>何か伝え足りないことはありますか？</label>
        <textarea
          id="notes"
          name="notes"
          rows={2}
          placeholder="要望などあればどうぞ（任意）"
        />
      </div>

      <div className={submitArea}>
        <div className={stepArea}>
          <button type="button" onClick={prevStep}>
            前に戻る
          </button>
        </div>
        <button type="submit">さあ、罵ってください。</button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};
