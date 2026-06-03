const RefundPolicy = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        <header className="mb-12">
          <span className="text-xs font-bold text-blue-900 tracking-[0.3em] uppercase mb-4 inline-block">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-6">Refund & Cancellation Policy</h1>
          <p className="text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
        </header>
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
          <p>
            Thank you for buying our study materials at Neti Academy. We want to make sure you have a rewarding experience while discovering and purchasing our content.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Digital Products</h2>
          <p>
            Due to the nature of digital goods, all sales of PDF question banks, current affairs, and digital study materials are considered final. <strong>We do not offer refunds or cancellations once the digital product has been purchased and accessed or downloaded.</strong>
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Exceptions</h2>
          <p>
            If you experience a technical issue preventing you from downloading the material you purchased, please contact our support team within 7 days of purchase. We will verify the issue and either resolve the technical problem or issue a refund at our discretion.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Contact</h2>
          <p>
            For any queries regarding refunds, email us at <a href="mailto:admin@netiacademy.com" className="text-blue-900 font-bold hover:underline">admin@netiacademy.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
