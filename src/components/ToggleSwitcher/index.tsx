import { UseFormRegisterReturn } from "react-hook-form";
import "./styles.css";

type ToggleSwitcherProps = {
  register: UseFormRegisterReturn;
};

export const ToggleSwitcher = ({ register }: ToggleSwitcherProps) => {
  return (
    <div className="vc-toggle-container">
      <label className="vc-switch">
        <input type="checkbox" className="vc-switch-input" {...register} />
        <span className="vc-switch-label" data-on="Yes" data-off="No"></span>
        <span className="vc-handle"></span>
      </label>
    </div>
  );
};
