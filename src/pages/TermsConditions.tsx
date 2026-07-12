const TermsConditions = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        <header className="mb-12">
          <span className="text-xs font-bold text-[var(--color-neti-accent)] tracking-[0.3em] uppercase mb-4 inline-block">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-lora font-bold text-slate-900 mb-6">Terms & Conditions</h1>
          <p className="text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
        </header>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
          <p>
            Welcome to Neti Academy. By accessing or using our platform, you agree to be bound by these Terms and Conditions.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Intellectual Property</h2>
          <p>
            All content on this platform, including PDFs, study materials, and text, is the property of Neti Academy and is protected by copyright laws. You may not reproduce, distribute, or sell any of the content without our express written permission.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Limitation of Liability</h2>
          <p>
            Neti Academy provides study materials for competitive exam preparation but does not guarantee specific results or outcomes. We are not liable for any direct, indirect, or incidental damages arising from the use of our services.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Governing Law</h2>
          <p>
            These terms shall be governed by and constructed in accordance with the laws of India.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
