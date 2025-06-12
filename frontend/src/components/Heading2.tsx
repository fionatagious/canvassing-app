interface Heading2Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const Heading2 = ({ children, className = "", ...rest }: Heading2Props) => {
  return (
    <h2
      className={`${className} text-3xl text-center sm:text-left md:text-2xl my-4`}
      {...rest}
    >
      {children}
    </h2>
  );
};

export default Heading2;
