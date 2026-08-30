document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact_form");
  const status = document.querySelector(".form_status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const parms = {
      subject: document.getElementById("subject").value,
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    emailjs.send("service_yxpwi92", "template_0o7bnph", parms)
      .then(() => {
        alert("Email sent successfully!");
        if (status) status.textContent = "";
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        alert("Something went wrong, please try again.");
      });
  });
});