const PrivacyPolicy = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        <header className="mb-12">
          <span className="text-xs font-bold text-blue-900 tracking-[0.3em] uppercase mb-4 inline-block">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-6">Privacy Policy</h1>
          <p className="text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
        </header>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
          <p>
            At Neti Academy, we value your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our platform and services.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, make a purchase, or communicate with us. This may include your name, email address, and payment information.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Information</h2>
          <p>
            We use the information we collect to deliver and improve our services, process transactions, send you updates, and provide customer support.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:admin@netiacademy.com" className="text-blue-900 font-bold hover:underline">admin@netiacademy.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
