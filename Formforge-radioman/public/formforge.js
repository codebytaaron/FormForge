(function () {
  const script = document.currentScript;
  const formId = script.dataset.form;

  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    await fetch(`/api/submit?formId=${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    alert("Form submitted");
    form.reset();
  });
})();
