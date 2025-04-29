export function mockAnalyzeContract(content: string) {
  // Simple keyword-based analysis for demonstration
  const hasConfidentiality = content.toLowerCase().includes("confidential")
  const hasLiability = content.toLowerCase().includes("liability")
  const hasTermination = content.toLowerCase().includes("termination")
  const hasWarranty = content.toLowerCase().includes("warranty")
  const hasGoverningLaw = content.toLowerCase().includes("governing law")

  const clauses = []
  const risks = []

  if (hasConfidentiality) {
    clauses.push({
      title: "Confidentiality",
      description: "Requires parties to maintain confidentiality of shared information",
    })
  }

  if (hasLiability) {
    clauses.push({
      title: "Limitation of Liability",
      description: "Limits liability for certain types of damages",
    })

    if (!content.toLowerCase().includes("consequential")) {
      risks.push("Liability clause does not explicitly exclude consequential damages")
    }
  } else {
    risks.push("No liability limitations found - consider adding protection")
  }

  if (hasTermination) {
    clauses.push({
      title: "Termination",
      description: "Defines conditions under which the agreement can be terminated",
    })
  } else {
    risks.push("No termination clause found - consider adding clear termination provisions")
  }

  if (hasWarranty) {
    clauses.push({
      title: "Warranty",
      description: "Provides guarantees regarding product or service quality",
    })
  } else {
    risks.push("No warranty provisions found - consider clarifying warranty terms")
  }

  if (hasGoverningLaw) {
    clauses.push({
      title: "Governing Law",
      description: "Specifies which jurisdiction's laws govern the agreement",
    })
  } else {
    risks.push("No governing law specified - consider adding jurisdiction information")
  }

  // Generate a simple summary based on content length and identified clauses
  let summary = ""
  if (content.length < 500) {
    summary = "Brief contract with limited detail. "
  } else if (content.length < 2000) {
    summary = "Standard-length contract with moderate detail. "
  } else {
    summary = "Comprehensive contract with extensive provisions. "
  }

  summary += `Contains ${clauses.length} identified key clauses. `

  if (risks.length > 2) {
    summary += "Several potential risks identified that should be addressed."
  } else if (risks.length > 0) {
    summary += "Some potential risks identified that should be reviewed."
  } else {
    summary += "No significant risks identified in the current analysis."
  }

  return {
    summary,
    clauses,
    risks,
  }
}
