import { useState, useRef, ChangeEvent, FormEvent } from "react";
import {
  type Project,
  type ProjectFormData,
} from "../server/projects.functions.ts";
import { cn } from "../lib/utils";

interface ProjectFormProps {
  project?: Project | null;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function ProjectForm({
  project,
  onSubmit,
  onCancel,
  isSubmitting,
}: ProjectFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    id: project?.id,
    title: project?.title || "",
    description: project?.description || "",
    github_url: project?.github_url || "",
    linkedin_url: project?.linkedin_url || "",
    skills: project?.skills || [],
    image_url: project?.image_url || "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string>(
    project?.image_url || "",
  );
  const [imageError, setImageError] = useState("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file");
      return;
    }

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must be less than 5MB");
      return;
    }

    setImageError("");
    setFormData((prev) => ({
      ...prev,
      image_file: file,
    }));

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;

    if (!formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
    }
    setSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.skills.length === 0) {
      alert("Please add at least one skill");
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-slate-200 mb-2"
        >
          Project Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          disabled={isSubmitting}
          placeholder="Enter project title"
          maxLength={255}
          required
          className={cn(
            "w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white",
            "placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500",
            "transition disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-200 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          disabled={isSubmitting}
          placeholder="Describe your project"
          rows={4}
          required
          className={cn(
            "w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white",
            "placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500",
            "transition disabled:opacity-50 disabled:cursor-not-allowed resize-none",
          )}
        />
      </div>

      {/* URLs - Two Column Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label
            htmlFor="github_url"
            className="block text-sm font-medium text-slate-200 mb-2"
          >
            GitHub URL
          </label>
          <input
            type="url"
            id="github_url"
            name="github_url"
            value={formData.github_url}
            onChange={handleInputChange}
            disabled={isSubmitting}
            placeholder="https://github.com/..."
            className={cn(
              "w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white",
              "placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500",
              "transition disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="linkedin_url"
            className="block text-sm font-medium text-slate-200 mb-2"
          >
            LinkedIn Post URL
          </label>
          <input
            type="url"
            id="linkedin_url"
            name="linkedin_url"
            value={formData.linkedin_url}
            onChange={handleInputChange}
            disabled={isSubmitting}
            placeholder="https://linkedin.com/feed/..."
            className={cn(
              "w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white",
              "placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500",
              "transition disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          />
        </div>
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Skills
        </label>
        <div className="space-y-3">
          {/* Skill Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              disabled={isSubmitting}
              placeholder="Add a skill (e.g., React, TypeScript)"
              className={cn(
                "flex-1 px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white",
                "placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500",
                "transition disabled:opacity-50 disabled:cursor-not-allowed",
              )}
            />
            <button
              type="button"
              onClick={handleAddSkill}
              disabled={isSubmitting || !skillInput.trim()}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition",
                "bg-indigo-600 text-white hover:bg-indigo-700",
                "disabled:opacity-50 disabled:cursor-not-allowed",
              )}
            >
              Add
            </button>
          </div>

          {/* Skills Display */}
          {formData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <div
                  key={skill}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/20 border border-indigo-500/50 text-indigo-200"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    disabled={isSubmitting}
                    className="text-indigo-400 hover:text-indigo-200 transition disabled:opacity-50"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Project Image
        </label>
        <div className="space-y-3">
          <div
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "border-2 border-dashed border-slate-600 rounded-lg p-6 text-center cursor-pointer",
              "transition hover:border-indigo-500 hover:bg-slate-700/50",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            {previewUrl ? (
              <div className="space-y-3">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewUrl("");
                    setFormData((prev) => ({
                      ...prev,
                      image_file: undefined,
                      image_url: "",
                    }));
                  }}
                  disabled={isSubmitting}
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition"
                >
                  Change Image
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-3xl text-slate-400">📷</div>
                <p className="text-slate-300 font-medium">
                  Click to upload image
                </p>
                <p className="text-xs text-slate-400">PNG, JPG up to 5MB</p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isSubmitting}
            className="hidden"
          />
          {imageError && <p className="text-sm text-red-400">{imageError}</p>}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-700">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "flex-1 px-6 py-2 rounded-lg font-semibold transition-all duration-200",
            "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          {isSubmitting
            ? project
              ? "Updating..."
              : "Creating..."
            : project
              ? "Update Project"
              : "Create Project"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className={cn(
            "flex-1 px-6 py-2 rounded-lg font-semibold transition-all duration-200",
            "bg-slate-700 text-slate-200 hover:bg-slate-600",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
