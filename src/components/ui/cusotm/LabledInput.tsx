function LabeledInput({
  label,
  labelBg = "bg-white",
  type,
  value,
  onChange,
  width = "w-full",
  notes,
  error,
  showErrorMessage,
  dir = "rtl",
}: {
  label: string;
  labelBg?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  width?: string;
  notes?: string;
  error?: string | null;
  dir?: "rtl" | "ltr";
  showErrorMessage?: boolean;
}) {
  const random = Math.random();
  return (
    <div className={width}>
      <div className={`relative`}>
        <input
          type={type}
          id={label + random}
          dir={dir}
          className={[
            width,
            error
              ? "border-red-600 focus:border-red-600"
              : "border-gray-300 focus:border-gray-300",
            "block px-2.5 pb-1.5 pt-2 text-sm text-gray-700 bg-transparent rounded-md border appearance-none focus:outline-none focus:ring-0 peer",
          ].join(" ")}
          placeholder=" "
          value={value}
          onChange={(val) => onChange(val.target.value)}
        />
        <label
          htmlFor={label + random}
          className={[
            error
              ? "text-red-600 peer-focus:text-red-600"
              : "text-gray-400 peer-focus:text-gray-700 ",
            labelBg,
            "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 right-1",
          ].join(" ")}
        >
          {label}
        </label>
      </div>
      {error && showErrorMessage && (
        <p className="text-xs text-red-600 mr-2 mt-1">{error}</p>
      )}
      {notes && (
        <p className={`mb-0 text-gray-400 text-xs mr-2 ${!error && "mt-1"}`}>
          {notes}
        </p>
      )}
    </div>
  );
}

export default LabeledInput;
