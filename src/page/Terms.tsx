export default function Terms() {
  const data = [
    {
      section: "Welcome Message",
      content:
        "Welcome to Quotie Pockets! By using our service, you agree to the following terms.",
    },
    {
      section: "Usage",
      content:
        "You must be 13 or older to use Quotie Pockets. Use the service responsibly and lawfully.",
    },
    {
      section: "User Accounts",
      content:
        "Keep your account information accurate and secure. You're responsible for all activities under your account.",
    },
    {
      section: "Intellectual Property",
      content:
        "We own Quotie Pockets' content and functionality. You retain ownership of your content but grant us a license to use it on the platform.",
    },
    {
      section: "Prohibited Activities",
      content:
        "Don't violate laws or third-party rights, disrupt the service, or access others' accounts.",
    },
    {
      section: "Disclaimer",
      content:
        "Quotie Pockets is provided as-is, with no warranties about accuracy or completeness of content.",
    },
    {
      section: "Limitation of Liability",
      content:
        "We're not liable for indirect, incidental, or consequential damages arising from your use of Quotie Pockets.",
    },
    {
      section: "Changes to Terms",
      content:
        "We may update these terms; major changes will be notified 30 days in advance.",
    },
    {
      section: "Governing Law",
      content: "These terms are governed by the laws of [Your Jurisdiction].",
    },
    {
      section: "Contact Us",
      content:
        "If you have questions, reach out to us.",
    },
  ];
  return (
    <section className="prose lg:prose-xl text-justify mt-14 mx-auto">
      <h1 className="text-center">Terms of Use</h1>
      <p>
        Welcome to Quotie Pockets! These Terms of Use ("Terms") govern your use
        of the Quotie Pockets website and services (collectively, the "Service")
        provided by Quotie Pockets ("we," "us," or "our").
      </p>
      <p>
        By accessing or using the Service, you agree to be bound by these Terms.
        If you disagree with any part of the Terms, you may not access the
        Service.
      </p>
      <div>
        {data?.map((item) => {
          return (
            <div>
              <h4>{item?.section}</h4>
              <ul>
                <li>{item?.content}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
