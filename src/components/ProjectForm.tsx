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
    image_url: project?.image_url || [],
    image_files: [],
  });

  const [skillInput, setSkillInput] = useState("");
  const [localImages, setLocalImages] = useState<
    { file: File; preview: string }[]
  >([]);
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

  const readFileAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    let latestError = "";
    const validFiles: File[] = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        latestError = "Please select image files only";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        latestError = "Each image must be less than 5MB";
        return;
      }

      validFiles.push(file);
    });

    if (latestError) {
      setImageError(latestError);
    } else {
      setImageError("");
    }

    if (!validFiles.length) {
      e.target.value = "";
      return;
    }

    const previews = await Promise.all(
      validFiles.map(async (file) => ({
        file,
        preview: await readFileAsDataUrl(file),
      })),
    );

    setLocalImages((prev) => [...prev, ...previews]);
    setFormData((prev) => ({
      ...prev,
      image_files: [...(prev.image_files ?? []), ...validFiles],
    }));

    e.target.value = "";
  };

  const handleRemoveExistingImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      image_url: (prev.image_url ?? []).filter((_, i) => i !== index),
    }));
  };

  const handleRemoveNewImage = (index: number) => {
    setLocalImages((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      image_files: (prev.image_files ?? []).filter((_, i) => i !== index),
    }));
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
          Project Images
        </label>
        <div className="space-y-4">
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            className={cn(
              "border-2 border-dashed border-slate-600 rounded-lg p-6 text-center cursor-pointer",
              "transition hover:border-indigo-500 hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            <div className="space-y-2">
              <div className="text-3xl text-slate-400">📷</div>
              <p className="text-slate-300 font-medium">
                Click to upload images
              </p>
              <p className="text-xs text-slate-400">
                You can select multiple images (PNG, JPG up to 5MB each)
              </p>
              {(formData.image_url?.length ?? 0) + localImages.length > 0 && (
                <p className="text-xs text-indigo-300">
                  {(formData.image_url?.length ?? 0)} saved • {localImages.length}{" "}
                  new
                </p>
              )}
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            disabled={isSubmitting}
            className="hidden"
          />
          {imageError && <p className="text-sm text-red-400">{imageError}</p>}

          {(formData.image_url?.length ?? 0) + localImages.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {(formData.image_url ?? []).map((url, index) => (
                <div
                  key={`existing-${index}`}
                  className="group relative overflow-hidden rounded-lg border border-slate-600"
                >
                  <img
                    src={url}
                    alt={`Project image ${index + 1}`}
                    className="h-32 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-start justify-between p-2">
                    <span className="rounded-full bg-slate-900/70 px-2 py-1 text-xs text-slate-200">
                      Saved
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveExistingImage(index);
                      }}
                      disabled={isSubmitting}
                      className="rounded-full bg-black/60 px-2 py-1 text-xs text-red-200 opacity-0 transition group-hover:opacity-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              {localImages.map((image, index) => (
                <div
                  key={`local-${index}`}
                  className="group relative overflow-hidden rounded-lg border border-indigo-500/40"
                >
                  <img
                    src={image.preview}
                    alt={`New upload ${index + 1}`}
                    className="h-32 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-start justify-between p-2">
                    <span className="rounded-full bg-indigo-900/80 px-2 py-1 text-xs text-indigo-100">
                      New
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveNewImage(index);
                      }}
                      disabled={isSubmitting}
                      className="rounded-full bg-black/60 px-2 py-1 text-xs text-red-200 opacity-0 transition group-hover:opacity-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">
              No images selected yet. Add at least one image to showcase your
              project.
            </p>
          )}
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
