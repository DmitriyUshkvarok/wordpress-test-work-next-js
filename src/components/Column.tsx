interface ColumnProps {
  children: React.ReactNode;
  width: string | number;
  textColor: string;
  backgroundColor: string;
}

export const Column = ({
  children,
  width,
  textColor,
  backgroundColor,
}: ColumnProps) => {
  const textColorStyle = textColor ? { color: textColor } : {};
  const backgroundColorStyle = backgroundColor ? { backgroundColor } : {};
  const widthStyle = width
    ? { minWidth: width, flexGrow: 1 }
    : { flexGrow: 1, flexBasis: 0 };
  return (
    <div
      style={{ ...widthStyle, ...textColorStyle, ...backgroundColorStyle }}
      className="px-2 py-5 self-start"
    >
      {children}
    </div>
  );
};
