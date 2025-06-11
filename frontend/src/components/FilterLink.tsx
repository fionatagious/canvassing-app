interface FilterLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label?: string;
  className?: string;
}

const FilterLink = ({ label, className = "", ...rest }: FilterLinkProps) => {
  return (
    <a
      {...rest}
      className={`${className} cursor-pointer border-2 text-primary border-primary bg-white p-2 rounded-md hover:bg-btn-hover hover:text-white `}
    >
      {label}
    </a>
  );
};

export default FilterLink;
