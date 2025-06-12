interface Heading1Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const Heading1 = ({ children, className, ...rest }: Heading1Props) => {
  return (
    <h1
      className={`${className} text-4xl text-center md:text-3xl my-4`}
      {...rest}
    >
      {children}
    </h1>
  );
};

export default Heading1;
