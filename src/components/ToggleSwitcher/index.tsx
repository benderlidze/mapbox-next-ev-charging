import "./styles.css";

export const ToggleSwitcher = () => {
  return (
    <div className="vc-toggle-container">
      <label className="vc-switch">
        <input type="checkbox" className="vc-switch-input" />
        <span className="vc-switch-label" data-on="Yes" data-off="No"></span>
        <span className="vc-handle"></span>
      </label>
    </div>
  );
};
