interface ParagraphProps {
  className?: string;
  children?: string | string[];
}
const Paragraph = ({ children, className }: ParagraphProps) => {
  return <p className={`${className} text-lg md:text-xl my-4`}>{children}</p>;
};

export default Paragraph;
