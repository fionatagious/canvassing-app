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
    <div className="page-padding flex flex-col justify-center">
      <h1 className="text-2xl mb-4">Add Contact</h1>
      <div className="flex bg-white rounded-md border-slate-900 border-2 pl-8 py-4 mb-8">
        <p>
          Fill out the form below to add a contact. The only required field is
          name. You can edit the contact later to add more information.
        </p>
      </div>
      <form
        data-cy="add-contact-form"
        className="flex flex-col justify-center p-7 border-[1px] border-gray-900 rounded-md bg-white"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <h2>Add Contact</h2>
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
        <hr />
        <Button className="my-4" label="Add contact" type="submit" />
      </form>
    </div>
  );
};

export default AddContactPage;
