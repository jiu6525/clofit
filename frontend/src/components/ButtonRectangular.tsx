interface ButtonRectangularProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean; // 비활성화 속성
}

function ButtonRectangular({
  text,
  onClick,
  disabled,
}: ButtonRectangularProps) {
  return (
    <button
      onClick={onClick}
      className={`button-common rounded-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled} // 버튼 비활성화 속성
    >
      {text}
    </button>
  );
}

export default ButtonRectangular;
