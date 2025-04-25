const faqs = [
  {
    question: "What is ClauseGuard?",
    answer: "ClauseGuard is an AI-powered legal assistant that helps you research case law and analyze contracts efficiently and accurately."
  },
  {
    question: "Who can use ClauseGuard?",
    answer: "ClauseGuard is designed for lawyers, legal professionals, businesses, and anyone who needs to review contracts or research legal information."
  },
  {
    question: "How does ClauseGuard analyze contracts?",
    answer: "ClauseGuard uses advanced AI models trained on millions of legal documents to identify risks, summarize clauses, and provide actionable recommendations."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. ClauseGuard uses industry-standard encryption and never shares your data without your consent."
  },
  {
    question: "Can I try ClauseGuard for free?",
    answer: "Yes! You can sign up for a free trial to experience ClauseGuard's features before committing to a paid plan."
  }
];

export default function FAQSection() {
  return (
    <section id="faq" className="faq py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
        <div className="faq-list max-w-2xl mx-auto space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item border-b pb-4">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
