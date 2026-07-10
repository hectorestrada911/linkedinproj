"use client";

import { useRef, useState } from "react";
import { FileText, Loader2, Upload } from "lucide-react";
import { apiUrl } from "@/lib/api";
import { cn } from "@/lib/utils";

interface DocumentUploadProps {
  fileName: string | null;
  onImport: (text: string, filename: string) => void;
}

const ACCEPT = ".txt,.md,.pdf,.docx";

async function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsText(file);
  });
}

export function DocumentUpload({ fileName, onImport }: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  async function handleFile(file: File) {
    setLoading(true);
    setError(null);

    try {
      const ext = file.name.split(".").pop()?.toLowerCase();
      let text: string;

      if (ext === "txt" || ext === "md") {
        text = (await readTextFile(file)).trim();
      } else {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(apiUrl("/api/document/parse"), {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Upload failed");
        text = data.text as string;
      }

      if (!text) throw new Error("No text found in document");
      onImport(text, file.name);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not parse document");
    } finally {
      setLoading(false);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        disabled={loading}
        className={cn(
          "flex w-full flex-col items-center justify-center rounded-lg border border-dashed px-4 py-8 transition-colors",
          dragOver
            ? "border-[#38bdf8]/50 bg-[#38bdf8]/[0.06]"
            : "border-[#27272a] bg-[#09090b] hover:border-[#3f3f46] hover:bg-[#0c0c0e]"
        )}
      >
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin text-[#38bdf8]" />
        ) : (
          <Upload className="h-6 w-6 text-[#52525b]" />
        )}
        <p className="mt-3 text-[13px] font-medium text-[#d4d4d8]">
          {loading ? "Extracting text…" : "Drop a file or click to upload"}
        </p>
        <p className="mt-1 text-[11px] text-[#52525b]">.txt, .md, .pdf, .docx · max 5 MB</p>
      </button>

      {fileName && (
        <div className="flex items-center gap-2 rounded-lg border border-[#27272a] bg-[#0c0c0e] px-3 py-2.5">
          <FileText className="h-4 w-4 shrink-0 text-[#38bdf8]" />
          <span className="truncate text-[12px] text-[#a1a1aa]">{fileName}</span>
        </div>
      )}

      {error && <p className="text-[12px] text-[#fca5a5]">{error}</p>}
    </div>
  );
}
