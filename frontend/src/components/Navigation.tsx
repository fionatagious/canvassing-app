import { NavLink } from "react-router";
import { links } from "../data/consts";

const Navigation = () => {
  return (
    <nav className="flex gap-10 justify-left py-6 px-6 bg-white sticky top-0">
      <NavLink to={links.home.href}>{links.home.name}</NavLink>
      <NavLink to={links.contacts.href}>{links.contacts.name}</NavLink>
      <NavLink to={links.newContact.href}>{links.newContact.name}</NavLink>
      <NavLink to={links.notes.href}>{links.notes.name}</NavLink>
    </nav>
  );
};

export default Navigation;
