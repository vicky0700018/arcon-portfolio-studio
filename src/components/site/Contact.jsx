import { useState } from "react";
import { usePortfolio } from "../../lib/portfolio-store";
import SectionHeading from "./SectionHeading";

const emptyForm = { name: "", email: "", phone: "", subject: "", message: "" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  else if (form.name.trim().length > 100) errors.name = "Name must be under 100 characters.";

  if (!form.email.trim()) errors.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) errors.email = "Enter a valid email address.";

  if (!form.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!/^[+\d][\d\s-]{6,19}$/.test(form.phone.trim())) errors.phone = "Enter a valid phone number.";

  if (!form.subject.trim()) errors.subject = "Please enter a subject.";
  else if (form.subject.trim().length > 120) errors.subject = "Subject must be under 120 characters.";

  if (!form.message.trim()) errors.message = "Please enter a message.";
  else if (form.message.trim().length > 1000) errors.message = "Message must be under 1000 characters.";

  return errors;
}

export default function Contact() {
  const { data } = usePortfolio();
  const { contact } = data;
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const setField = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSuccess("");
      return;
    }
    setForm(emptyForm);
    setSuccess("Thank you! Your message has been received in this demo portfolio.");
  };

  const fields = [
    { key: "name", label: "Name", type: "text", autoComplete: "name" },
    { key: "email", label: "Email", type: "email", autoComplete: "email" },
    { key: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
    { key: "subject", label: "Subject", type: "text" },
  ];

  return (
    <section id="contact" className="section bg-background scroll-mt-24">
      <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk about your project"
            description="Reach out through the details below, or send a message using the demo form."
          />
          <div className="card-base mt-8 p-6">
            <h3 className="text-base font-bold text-foreground">{contact.businessName}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{contact.ownerName}</p>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="field-label">Address</dt>
                <dd className="text-foreground">{contact.address}</dd>
              </div>
              <div>
                <dt className="field-label">Phone</dt>
                <dd>
                  <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="text-royal hover:underline">
                    {contact.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="field-label">Email</dt>
                <dd className="text-foreground">{contact.email}</dd>
              </div>
            </dl>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="card-base p-6 sm:p-8">
          <h3 className="text-lg font-bold text-foreground">Send a message</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            This demo form validates in the browser only — nothing is stored or sent.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.key} className={field.key === "subject" ? "sm:col-span-2" : ""}>
                <label className="field-label" htmlFor={`contact-${field.key}`}>
                  {field.label}
                </label>
                <input
                  id={`contact-${field.key}`}
                  name={field.key}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  value={form[field.key]}
                  onChange={setField(field.key)}
                  aria-invalid={Boolean(errors[field.key])}
                  aria-describedby={errors[field.key] ? `contact-${field.key}-error` : undefined}
                  className="field"
                />
                {errors[field.key] ? (
                  <p id={`contact-${field.key}-error`} className="mt-1 text-xs font-medium text-destructive">
                    {errors[field.key]}
                  </p>
                ) : null}
              </div>
            ))}

            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                maxLength={1000}
                value={form.message}
                onChange={setField("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className="field resize-y"
              />
              {errors.message ? (
                <p id="contact-message-error" className="mt-1 text-xs font-medium text-destructive">
                  {errors.message}
                </p>
              ) : null}
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-6">
            Send Message
          </button>

          <p role="status" aria-live="polite" className="mt-4 text-sm font-semibold text-royal">
            {success}
          </p>
        </form>
      </div>
    </section>
  );
}
