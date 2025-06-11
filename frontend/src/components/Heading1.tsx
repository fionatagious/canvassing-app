interface Heading1Props {
  className?: string;
  title?: string;
}
const Heading1 = ({ title, className }: Heading1Props) => {
  return (
    <h1 className={`${className} text-4xl text-center md:text-3xl my-4`}>
      {title}
    </h1>
  );
};

export default Heading1;
