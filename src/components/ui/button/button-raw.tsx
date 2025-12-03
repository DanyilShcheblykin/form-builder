import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  ReactNode,
} from "react";

import classNames from "classnames";
import styles from "./button.module.scss";

interface IProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: ReactNode;
}

const ButtonRaw = forwardRef<HTMLButtonElement, IProps>((props, ref) => {
  const {
    className = "",
    type = "button",
    disabled,
    children,
    ...attrs
  } = props;

  return (
    <button
      className={classNames(styles.buttonRaw, className)}
      ref={ref}
      type={type}
      disabled={disabled}
      {...attrs}
    >
      {children}
    </button>
  );
});

ButtonRaw.displayName = "ButtonRaw";

export default ButtonRaw;
