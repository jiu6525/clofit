interface ButtonRectangularProps {
  text: string;
  onClick?: () => void;
}

function ButtonRectangular({ text, onClick }: ButtonRectangularProps) {
  return (
    <button onClick={onClick} className='button-common rounded-none'>
      {text}
    </button>
  );
}

export default ButtonRectangular;
