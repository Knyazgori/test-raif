import { FC } from "react";
import classes from "./Navigation.module.scss";
import RadioNav from "./RadioNav";

export interface NavigationProps {
  title: string;
  pagesData: any[];
  pageIndex: number;
  totalPages: number | null;
  page: string;
  setPage: (arg: number) => void;
}

const Navigation: FC<NavigationProps> = ({
  title,
  pagesData,
  pageIndex,
  totalPages,
  page,
  setPage,
}) => {
  const handleNavigation = (pageIndex: string) => {
    setPage(+pageIndex);
  };

  return (
    <nav className={classes.nav}>
      <div className={classes.textBlock}>
        {totalPages ? (
          <>
            <h2 className={classes["nav-title"]}>
              {title}{" "}
              <span
                className={classes["nav-title_steps"]}
              >{`(шаг ${page} из ${totalPages})`}</span>
            </h2>
          </>
        ) : (
          <h2 className={classes["nav-title"]}>{title}</h2>
        )}
      </div>
      <div className={classes["nav-radio-container"]}>
        {totalPages &&
          pagesData
            .filter((e) => !e?.isEnd)
            .map((it, index) => (
              <RadioNav
                key={it?.num}
                onChange={index >= pageIndex ? () => {} : handleNavigation}
                value={`${index}`}
                className={
                  classes["nav-radio__item"] +
                  " " +
                  (index >= pageIndex ? classes["nav-radio__item_disable"] : "")
                }
                selected={`${pageIndex}`}
                withoutDot
              />
            ))}
      </div>
    </nav>
  );
};

export default Navigation;
