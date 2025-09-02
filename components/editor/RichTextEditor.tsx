"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bold,
  Italic,
  Code,
  Link,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  Edit3,
} from "lucide-react";
import { ContentType } from "@/types/posts";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  contentType: ContentType;
  onContentTypeChange: (type: ContentType) => void;
  placeholder?: string;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  contentType,
  onContentTypeChange,
  placeholder = "Écrivez votre contenu...",
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  // Fonctions d'insertion de formatage Markdown
  const insertMarkdown = useCallback(
    (before: string, after: string = "") => {
      const textarea = document.querySelector(
        'textarea[data-editor="true"]',
      ) as HTMLTextAreaElement;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end);

      const newText =
        value.substring(0, start) +
        before +
        selectedText +
        after +
        value.substring(end);
      onChange(newText);

      // Repositionner le curseur
      setTimeout(() => {
        textarea.focus();
        const newCursorPos =
          start + before.length + selectedText.length + after.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    },
    [value, onChange],
  );

  const formatButtons = [
    { icon: Bold, action: () => insertMarkdown("**", "**"), title: "Gras" },
    { icon: Italic, action: () => insertMarkdown("*", "*"), title: "Italique" },
    {
      icon: Code,
      action: () => insertMarkdown("`", "`"),
      title: "Code inline",
    },
    { icon: Link, action: () => insertMarkdown("[", "](url)"), title: "Lien" },
    { icon: Heading1, action: () => insertMarkdown("# "), title: "Titre 1" },
    { icon: Heading2, action: () => insertMarkdown("## "), title: "Titre 2" },
    { icon: Heading3, action: () => insertMarkdown("### "), title: "Titre 3" },
    { icon: List, action: () => insertMarkdown("- "), title: "Liste" },
    {
      icon: ListOrdered,
      action: () => insertMarkdown("1. "),
      title: "Liste numérotée",
    },
    { icon: Quote, action: () => insertMarkdown("> "), title: "Citation" },
  ];

  const renderMarkdownPreview = (text: string) => {
    // Simple rendu Markdown pour la prévisualisation
    return text
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(
        /`(.*?)`/gim,
        '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>',
      )
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/gim,
        '<a href="$2" class="text-blue-600 hover:underline">$1</a>',
      )
      .replace(
        /^> (.*$)/gim,
        '<blockquote class="border-l-4 border-gray-300 pl-4 italic">$1</blockquote>',
      )
      .replace(/^- (.*$)/gim, "<li>$1</li>")
      .replace(/^1\. (.*$)/gim, "<li>$1</li>")
      .replace(/\n/gim, "<br>");
  };

  return (
    <div className={`border rounded-lg ${className}`}>
      {/* Header avec type de contenu et onglets */}
      <div className="flex items-center justify-between p-3 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Type:</span>
          <select
            value={contentType}
            onChange={(e) => onContentTypeChange(e.target.value as ContentType)}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="TEXT">Texte simple</option>
            <option value="MARKDOWN">Markdown</option>
            <option value="RICH_TEXT">Texte enrichi</option>
          </select>
        </div>

        {contentType === "MARKDOWN" && (
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "edit" | "preview")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit" className="flex items-center gap-1">
                <Edit3 size={14} />
                Éditer
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-1">
                <Eye size={14} />
                Aperçu
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </div>

      {/* Barre d'outils pour Markdown */}
      {contentType === "MARKDOWN" && activeTab === "edit" && (
        <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
          {formatButtons.map((button, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={button.action}
              title={button.title}
              className="h-8 w-8 p-0"
            >
              <button.icon size={14} />
            </Button>
          ))}
          <div className="ml-2 flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("```\n", "\n```")}
              title="Bloc de code"
              className="text-xs px-2 h-8"
            >
              Code
            </Button>
          </div>
        </div>
      )}

      {/* Zone d'édition */}
      <div className="p-3">
        {contentType === "MARKDOWN" && activeTab === "preview" ? (
          <div
            className="min-h-[200px] prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(value) }}
          />
        ) : (
          <Textarea
            data-editor="true"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[200px] border-0 resize-none focus:ring-0 p-0"
            style={{ boxShadow: "none" }}
          />
        )}
      </div>

      {/* Compteur de caractères */}
      <div className="px-3 py-2 border-t bg-gray-50 text-xs text-gray-500 flex justify-between">
        <span>{value.length} caractères</span>
        {contentType === "MARKDOWN" && (
          <span className="text-blue-600">
            Markdown activé - Utilisez la barre d'outils pour formater
          </span>
        )}
      </div>
    </div>
  );
};
