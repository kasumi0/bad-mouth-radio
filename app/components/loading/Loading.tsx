import { RingLoader } from "react-spinners";
import styles from "./loading.module.css";
const { loadingArea } = styles;

export const Loading = () => {
  return (
    <div className={loadingArea}>
      <RingLoader color="#d4a3ffff" size={100} />
      罵倒ラジオ生成中...
    </div>
  );
};
