import { Link } from "@/types/types";
import { X } from "lucide-react";

interface LinkInputProps {
  links: Link[];
  onLinksChange: (links: Link[]) => void;
}

export function LinkInput({ links, onLinksChange }: LinkInputProps) {
  const addLink = () => {
    onLinksChange([...links, { url: "", type: "" }]);
  };

  const removeLink = (index: number) => {
    onLinksChange(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, field: keyof Link, value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onLinksChange(newLinks);
  };

  return (
    <div className="space-y-3">
      {links.map((link, index) => (
        <div key={index} className="flex gap-3">
          <input
            type="text"
            placeholder="Link type (e.g., LinkedIn, Portfolio)"
            value={link.type}
            onChange={(e) => updateLink(index, "type", e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md"
          />
          <input
            type="url"
            placeholder="URL"
            value={link.url}
            onChange={(e) => updateLink(index, "url", e.target.value)}
            className="flex-2 px-3 py-2 border rounded-md"
          />
          <button
            onClick={() => removeLink(index)}
            className="p-2 text-gray-500 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
      <button
        onClick={addLink}
        className="text-sky-600 hover:text-sky-700 font-medium"
        type="button"
      >
        + Add Link
      </button>
    </div>
  );
}