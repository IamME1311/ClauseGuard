export function mockLegalResearch(query: string) {
  // Simple keyword-based research for demonstration
  const lowerQuery = query.toLowerCase()

  // Default response structure
  const result = {
    summary: "",
    references: [],
    precedents: [],
  }

  // IT Law related research
  if (lowerQuery.includes("computer fraud") || lowerQuery.includes("cfaa")) {
    result.summary =
      "The Computer Fraud and Abuse Act (CFAA) is a United States cybersecurity bill enacted in 1986 as an amendment to existing computer fraud law. It prohibits accessing a computer without authorization, or in excess of authorization. The CFAA has been amended several times, most recently in 2008, to address growing concerns of cybersecurity in the digital age."

    result.references = [
      {
        title: "Computer Fraud and Abuse Act",
        description: "18 U.S.C. § 1030 - Fraud and related activity in connection with computers",
      },
      {
        title: "The Evolution of the CFAA",
        description: "Harvard Journal of Law & Technology, Vol. 33, No. 2 (2020)",
      },
    ]

    result.precedents = [
      {
        case: "United States v. Nosal, 844 F.3d 1024 (9th Cir. 2016)",
        relevance: "Established that using a former colleague's password to access company data violates the CFAA.",
      },
      {
        case: "Van Buren v. United States, 141 S. Ct. 1648 (2021)",
        relevance:
          "Supreme Court narrowed the scope of the CFAA, ruling that it does not cover those who have authorized access to information but use it for unauthorized purposes.",
      },
    ]
  }

  // DMCA related research
  else if (lowerQuery.includes("dmca") || lowerQuery.includes("digital millennium")) {
    result.summary =
      "The Digital Millennium Copyright Act (DMCA) is a 1998 United States copyright law that implements two 1996 treaties of the World Intellectual Property Organization (WIPO). It criminalizes production and dissemination of technology, devices, or services intended to circumvent measures that control access to copyrighted works. It also provides safe harbor provisions for online service providers."

    result.references = [
      {
        title: "Digital Millennium Copyright Act",
        description: "17 U.S.C. § 512, § 1201-1205, § 1301-1332; 28 U.S.C. § 4001",
      },
      {
        title: "DMCA Safe Harbor Provisions",
        description: "Berkeley Technology Law Journal, Vol. 34, No. 3 (2019)",
      },
    ]

    result.precedents = [
      {
        case: "Viacom Int'l, Inc. v. YouTube, Inc., 676 F.3d 19 (2d Cir. 2012)",
        relevance:
          "Clarified the knowledge requirements for online service providers to maintain DMCA safe harbor protection.",
      },
      {
        case: "Lenz v. Universal Music Corp., 815 F.3d 1145 (9th Cir. 2016)",
        relevance: "Established that copyright holders must consider fair use before issuing DMCA takedown notices.",
      },
    ]
  }

  // Force-majeure related research
  else if (lowerQuery.includes("force majeure") || lowerQuery.includes("act of god")) {
    result.summary =
      "Force majeure clauses excuse a party from performance when extraordinary events prevent fulfillment of contractual obligations. Courts generally interpret these clauses narrowly and require the event to be unforeseeable and outside the reasonable control of the parties."

    result.references = [
      {
        title: "Force Majeure Clauses: Drafting Advice for the COVID-19 Era",
        description: "American Bar Association, Business Law Today (2020)",
      },
      {
        title: "Contractual Performance During a Pandemic",
        description: "Harvard Law Review, Vol. 133, No. 8 (2020)",
      },
    ]

    result.precedents = [
      {
        case: "Kel Kim Corp. v. Central Markets, Inc., 70 N.Y.2d 900 (1987)",
        relevance:
          "Established that force majeure clauses are narrowly construed and only apply to the events specifically listed or similar in nature and magnitude.",
      },
      {
        case: "Constellation Energy Services v. New England Power, 1998 WL 34073635",
        relevance: "Court found that market fluctuations, even severe ones, do not constitute force majeure events.",
      },
    ]
  }

  // Non-disclosure agreement research
  else if (
    lowerQuery.includes("nda") ||
    lowerQuery.includes("non-disclosure") ||
    lowerQuery.includes("confidentiality")
  ) {
    result.summary =
      "Non-disclosure agreements protect confidential information shared between parties. Effective NDAs clearly define what constitutes confidential information, specify permitted uses, establish the duration of confidentiality obligations, and outline remedies for breach."

    result.references = [
      {
        title: "Drafting Effective Non-Disclosure Agreements",
        description: "Georgetown Journal of Legal Ethics, Vol. 32 (2019)",
      },
      {
        title: "Trade Secrets and NDAs in the Digital Age",
        description: "Stanford Technology Law Review, Vol. 22 (2019)",
      },
    ]

    result.precedents = [
      {
        case: "Silicon Image, Inc. v. Analogk Semiconductor, Inc., 642 F. Supp. 2d 1147 (2009)",
        relevance:
          "Court enforced NDA despite claims of overbreadth, emphasizing the importance of clearly defining confidential information.",
      },
      {
        case: "nClosures Inc. v. Block and Company, Inc., 770 F.3d 598 (7th Cir. 2014)",
        relevance:
          "NDA was found unenforceable because the plaintiff failed to take reasonable steps to maintain confidentiality of the information.",
      },
    ]
  }

  // SaaS agreement research
  else if (
    lowerQuery.includes("saas") ||
    lowerQuery.includes("software as a service") ||
    lowerQuery.includes("cloud service")
  ) {
    result.summary =
      "SaaS agreements govern the provision of cloud-based software services. Key provisions include service level agreements (SLAs), data security and privacy terms, limitation of liability, intellectual property rights, and termination conditions."

    result.references = [
      {
        title: "Negotiating SaaS Agreements: A Customer Perspective",
        description: "The Computer & Internet Lawyer, Vol. 36, No. 5 (2019)",
      },
      {
        title: "Cloud Computing: Legal Issues in Centralized Environments",
        description: "MIT Technology Review, Business of Blockchain (2020)",
      },
    ]

    result.precedents = [
      {
        case: "Silverpop Systems, Inc. v. Leading Market Technologies, Inc., 641 F. App'x 849 (11th Cir. 2016)",
        relevance: "Court upheld limitation of liability clause in SaaS agreement, limiting damages to fees paid.",
      },
      {
        case: "Hotelbeds v. Expedia, Inc., 2020 WL 6343172 (D. Del. Oct. 29, 2020)",
        relevance:
          "Dispute over API integration and data usage rights in a SaaS context, emphasizing the importance of clear data licensing terms.",
      },
    ]
  }

  // Generic response if no specific topics matched
  else {
    result.summary =
      "Legal research on contract terms requires careful analysis of jurisdiction-specific laws, industry standards, and relevant case law. When drafting or reviewing contracts, it's important to consider both the explicit terms and their potential interpretation by courts."

    result.references = [
      {
        title: "Principles of Contract Law",
        description: "American Law Institute, Restatement (Second) of Contracts",
      },
      {
        title: "Contract Interpretation: Rules and Trends",
        description: "Yale Law Journal, Vol. 129 (2020)",
      },
    ]

    result.precedents = [
      {
        case: "Frigaliment Importing Co. v. B.N.S. International Sales Corp., 190 F. Supp. 116 (S.D.N.Y. 1960)",
        relevance: "Classic case on contract interpretation and the meaning of terms (what is chicken?).",
      },
      {
        case: "C & J Fertilizer, Inc. v. Allied Mutual Insurance Co., 227 N.W.2d 169 (Iowa 1975)",
        relevance: "Established the doctrine of reasonable expectations in contract interpretation.",
      },
    ]
  }

  return result
}
