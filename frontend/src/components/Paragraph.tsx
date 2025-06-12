interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

const Paragraph = ({ children, className = "", ...rest }: ParagraphProps) => {
  return (
    <p className={`text-lg md:text-xl my-4 ${className}`} {...rest}>
      {children}
    </p>
  );
};

export default Paragraph;
