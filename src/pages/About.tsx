const About = () => {
  return (
    <div className="mx-auto min-h-screen w-2/3 text-center">
      <h1 className="mt-20 text-4xl font-bold">About BCards</h1>
      <div className="mt-12 space-y-8 text-left">
        <section className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">Our Mission</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            BCards is designed to revolutionize how professionals manage and share their business contacts. 
            We provide a modern, digital solution for organizing business cards, making networking more efficient 
            and environmentally friendly.
          </p>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">Key Features</h2>
          <ul className="list-inside list-disc space-y-2 text-lg text-gray-600 dark:text-gray-300">
            <li>Create and customize digital business cards</li>
            <li>Organize your contacts efficiently</li>
            <li>Share cards instantly with other professionals</li>
            <li>Save favorite contacts for quick access</li>
            <li>Business-specific features for company cards</li>
          </ul>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">How It Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Simply create an account, design your digital business card, and start networking! 
            Business users can create and manage multiple cards, while regular users can collect 
            and organize cards from their professional network. Our platform makes it easy to 
            stay connected and grow your professional relationships.
          </p>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">Contact Us</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Have questions or suggestions? We'd love to hear from you! 
            Reach out to our support team, and we'll be happy to assist you 
            with any inquiries about our digital business card platform.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
