import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  Resolver,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
// fetch calls
import { createContact } from "../api/v1/contacts";
// components
import TextInput from "../components/TextInput";
import CheckboxInput from "../components/CheckboxInput";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import Heading1 from "../components/Heading1";
import Heading2 from "../components/Heading2";
import Paragraph from "../components/Paragraph";
// validation
import {
  createContactSchema,
  CreateContactFormData,
} from "../schemas/createContactSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { links } from "../data/consts";

const AddContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateContactFormData>({
    resolver: yupResolver(
      createContactSchema
    ) as Resolver<CreateContactFormData>,
  });

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<CreateContactFormData> = (data) => {
    createContact(
      data.name || "",
      data.address || "",
      data.email || "",
      data.notes || "",
      data.contacted,
      data.followup
    );
    alert(`Contact created! ${JSON.stringify(data)}`);
    navigate(links.contacts.href);
  };

  const onError: SubmitErrorHandler<CreateContactFormData> = (errors) => {
    const errorsMessage = Object.values(errors)
      .map((error) => `• ${error.message}`)
      .join("\n");
    alert(`Please fix these form errors before submitting.\n${errorsMessage}`);
  };

  return (
    <div className="px-4 md:px-6 py-4 md:py-6 flex flex-col justify-center">
      <Heading1>Add Contact</Heading1>
      <div className="flex bg-white rounded-md border-slate-900 border-2 px-8 py-4 mb-8">
        <Paragraph>
          Fill out the form below to add a contact. The only required field is
          name. You can edit the contact later to add more information.
        </Paragraph>
      </div>
      <form
        data-cy="add-contact-form"
        className="flex flex-col justify-center p-7 border-[1px] border-gray-900 rounded-md bg-white"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Heading2>Add Contact</Heading2>
        <TextInput
          name="name"
          label="Name"
          placeholder="contact's name"
          type="text"
          register={register}
        />
        <TextInput
          name="address"
          label="Address"
          placeholder="contact's address"
          type="text"
          register={register}
        />
        <TextInput
          name="email"
          label="Email"
          placeholder="contact's email"
          type="email" // HTML5 introduced email type for input validation
          register={register}
        />
        <TextArea
          name="notes"
          label="Notes"
          placeholder="your notes here"
          register={register}
        />
        <CheckboxInput
          name="contacted"
          label="Contacted?"
          type="checkbox"
          register={register}
        />
        <CheckboxInput
          name="followup"
          label="Follow up needed?"
          type="checkbox"
          register={register}
        />
        <hr className="border-t-2 border-gray-300 my-4" />
        <Button className="my-4" label="Add contact" type="submit" />
      </form>
    </div>
  );
};

export default AddContactPage;
