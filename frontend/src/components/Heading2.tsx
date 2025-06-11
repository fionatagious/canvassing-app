interface Heading2Props {
  className?: string;
  title?: string;
}
const Heading2 = ({ title, className }: Heading2Props) => {
  return (
    <h2
      className={`${className} text-3xl text-center sm:text-left md:text-2xl my-4`}
    >
      {title}
    </h2>
  );
};

export default Heading2;
