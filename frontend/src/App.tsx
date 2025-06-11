import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import { links } from "./data/consts";
import Heading1 from "./components/Heading1";
import Heading2 from "./components/Heading2";
import Paragraph from "./components/Paragraph";

const App: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="px-4 md:px-6 py-4 md:py-6 h-full">
      <div className="flex flex-col border-2 bg-white p-7 rounded-md border-gray-900 justify-center">
        <Heading1 title="Welcome to Empower's canvassing app!" />
        <Paragraph>
          This app is designed to help you to keep track of your contacts who
          you have engaged with during your canvassing sessions. It also enables
          you to write down their contact information and any notes you may have
          about them or the conversation you had with them.
        </Paragraph>
        <hr className="border-t-2 border-gray-300 my-4" />
        <Heading2 title="Get started" />
        <Paragraph>
          To get started, you can add a new contact by clicking the button
          below.
        </Paragraph>
        <Button
          data-cy="add-contact-button"
          className="my-4 w-full sm:w-max"
          label={links.newContact.name}
          onClick={() => navigate(links.newContact.href)}
        />
        <Heading2 title="View contacts" />
        <Paragraph>
          You can view a list of all your canvassing contacts. This is a
          comprehensive list of all the people who you either have engaged with
          or who you intend to engage with in the future.
        </Paragraph>
        <Button
          data-cy="view-contacts-button"
          className="my-4 w-full sm:w-max"
          label="View your contacts"
          onClick={() => navigate(links.contacts.href)}
        />
        <Heading2 title="View notes" />
        <Paragraph>
          This is where you can quickly refer to your canvassing notes.
        </Paragraph>
        <Button
          data-cy="view-notes-button"
          className="my-4 w-full sm:w-max"
          label="View your notes"
          onClick={() => navigate(links.notes.href)}
        />
      </div>
    </div>
  );
};

export default App;
