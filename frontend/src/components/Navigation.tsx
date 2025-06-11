import { NavLink } from "react-router";
import { links } from "../data/consts";

interface NavigationProps {
  className?: string;
}

const Navigation = (className: NavigationProps) => {
  return (
    <nav className={`${className}`}>
      <NavLink to={links.home.href}>{links.home.name}</NavLink>
      <NavLink to={links.contacts.href}>{links.contacts.name}</NavLink>
      <NavLink to={links.newContact.href}>{links.newContact.name}</NavLink>
      <NavLink to={links.notes.href}>{links.notes.name}</NavLink>
    </nav>
  );
};

export default Navigation;
