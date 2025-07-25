import styles from "./play.module.css";
const { modalArea, voiceEnd } = styles;

type Props = {
  isEnd: boolean;
  onRetry: () => void;
  onReset: () => void;
};

export const Modal = ({ isEnd, onRetry, onReset }: Props) => {
  return (
    <div className={`${modalArea} ${isEnd ? voiceEnd : ""}`}>
      <button type="button" onClick={onRetry}>
        もう一回聴く
      </button>
      <button type="button" onClick={onReset}>
        やり直す
      </button>
    </div>
  );
};
