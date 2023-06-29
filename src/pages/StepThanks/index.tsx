import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import classes from "./StepThanks.module.scss"

const StepThanks = () => {
  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti recycle={false} width={width} height={height} />
      <h2 className={classes["thanks-text"]}>Благодарим за пройденный опрос</h2>
    </>
  );
};

export default StepThanks;
