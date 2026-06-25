import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

export const sendContactEmail = async (formData) => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS credentials not configured in env variables.");
    // Simulate API delay and succeed so that the form works locally in preview/dev mode
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: "jules.pecaoco.dev@gmail.com",
    };

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    return response;
  } catch (error) {
    throw error;
  }
};
