import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import { links } from "./data/consts";

const App: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page-padding h-full">
      <div className="flex flex-col border-2 bg-white p-7 rounded-md border-gray-900 justify-center">
        <h1>Welcome to Empower's canvassing app!</h1>
        <p>
          This app is designed to help you to keep track of your contacts who
          you have engaged with during your canvassing sessions. It also enables
          you to write down their contact information and any notes you may have
          about them or the conversation you had with them.
        </p>
        <hr />
        <h2>Get started</h2>
        <p>
          To get started, you can add a new contact by clicking the button
          below.
        </p>
        <Button
          data-cy="add-contact-button"
          className="my-4 w-full sm:w-max"
          label={links.newContact.name}
          onClick={() => navigate(links.newContact.href)}
        />
        <h2>View contacts</h2>
        <p>
          You can view a list of all your canvassing contacts. This is a
          comprehensive list of all the people who you either have engaged with
          or who you intend to engage with in the future.
        </p>
        <Button
          data-cy="view-contacts-button"
          className="my-4 w-full sm:w-max"
          label="View your contacts"
          onClick={() => navigate(links.contacts.href)}
        />
        <h2>View notes</h2>
        <p>This is where you can quickly refer to your canvassing notes.</p>
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
