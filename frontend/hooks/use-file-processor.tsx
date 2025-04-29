"use client"

import { useState, useCallback } from "react"
import * as pdfjs from "pdfjs-dist"
import { createWorker } from "tesseract.js"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface UseFileProcessorOptions {
  onProgressUpdate?: (progress: number) => void
  tesseractLanguage?: string
}

interface FileProcessorResult {
  text: string
  mimeType: string
  fileName: string
  fileSize: number
}

export function useFileProcessor(options: UseFileProcessorOptions = {}) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const { onProgressUpdate = () => {}, tesseractLanguage = "eng" } = options

  const processFile = useCallback(
    async (file: File): Promise<FileProcessorResult | null> => {
      if (!file) return null

      setIsProcessing(true)
      setError(null)
      setProgress(0)

      try {
        const updateProgress = (value: number) => {
          setProgress(value)
          onProgressUpdate(value)
        }

        let extractedText = ""
        const mimeType = file.type

        // Process PDF files
        if (mimeType === "application/pdf") {
          const arrayBuffer = await file.arrayBuffer()
          const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise
          const numPages = pdf.numPages

          for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i)
            const textContent = await page.getTextContent()
            const pageText = textContent.items.map((item: any) => item.str).join(" ")

            extractedText += pageText + "\n\n"
            updateProgress((i / numPages) * 100)
          }
        }
        // Process image files (using Tesseract OCR)
        else if (mimeType.startsWith("image/")) {
          const worker = await createWorker(tesseractLanguage)

          worker.setProgressHandler((p) => {
            updateProgress(p.progress * 100)
          })

          const { data } = await worker.recognize(file)
          extractedText = data.text
          await worker.terminate()
        }
        // Process text files
        else if (
          mimeType === "text/plain" ||
          mimeType === "application/rtf" ||
          mimeType === "application/msword" ||
          mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          extractedText = await file.text()
          updateProgress(100)
        } else {
          throw new Error(`Unsupported file type: ${mimeType}`)
        }

        return {
          text: extractedText,
          mimeType,
          fileName: file.name,
          fileSize: file.size,
        }
      } catch (err: any) {
        setError(err.message || "Error processing file")
        return null
      } finally {
        setIsProcessing(false)
      }
    },
    [onProgressUpdate, tesseractLanguage],
  )

  return {
    processFile,
    isProcessing,
    progress,
    error,
  }
}
