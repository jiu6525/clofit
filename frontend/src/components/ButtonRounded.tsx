interface ButtonRoundedProps {
  text: string;
  onClick?: () => void;
}

function ButtonRounded({ text, onClick }: ButtonRoundedProps) {
  return (
    <button onClick={onClick} className='button-common rounded-lg'>
      {text}
    </button>
  );
}

export default ButtonRounded;
