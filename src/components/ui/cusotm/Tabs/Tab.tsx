const Tab = ({
  title,
  icon,
  isSelected,
  disabled,
  onClick,
}: {
  title: string;
  icon: React.ReactNode;
  isSelected: boolean;
  disabled?: boolean;
  onClick: () => void;
}) => {
  return (
    <li
      onClick={() => !disabled && onClick()}
      className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
    >
      <div
        className={[
          "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg group",
          disabled
            ? "text-gray-400"
            : isSelected
            ? "text-cyan-600 border-cyan-600"
            : "hover:text-gray-600 hover:border-gray-300",
        ].join(" ")}
      >
        {icon}
        <div className="w-2" />
        {title}
      </div>
    </li>
  );
};

export default Tab;
