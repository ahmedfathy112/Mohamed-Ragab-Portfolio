# 🎨 Project Management Dashboard - UI/UX Guide

Visual design system, component showcase, and user experience documentation.

## 📐 Design System

### **Color Palette**

#### Primary Colors

```
Slate-900:  #0f172a  (Background)
Slate-800:  #1e293b  (Card backgrounds)
Slate-700:  #334155  (Borders, hover)
Slate-600:  #475569  (Disabled text)
```

#### Accent Colors

```
Indigo-600: #4f46e5  (Buttons, focus)
Indigo-700: #4338ca  (Hover states)
Indigo-500: #6366f1  (Ring focus)
```

#### Semantic Colors

```
Success:    #059669 / #10b981  (Create, update)
Error:      #dc2626 / #ef4444  (Delete, errors)
Warning:    #f59e0b             (Warnings)
```

#### Text Colors

```
White:      #ffffff             (Headlines)
Slate-200:  #e2e8f0  (Primary text)
Slate-400:  #94a3b8  (Secondary text)
Slate-500:  #64748b  (Disabled text)
```

---

## 🎭 Component Visual Hierarchy

### **Typography**

```
Heading 1 (Page Title)
│ Font Size: 36px (text-4xl)
│ Font Weight: 700 (bold)
│ Color: white
│ Usage: "Project Dashboard"
│
Heading 2 (Section Title)
│ Font Size: 24px (text-2xl)
│ Font Weight: 700 (bold)
│ Color: white
│ Usage: "Edit Project", "Add New Project"
│
Heading 3 (Card Title)
│ Font Size: 20px (text-xl)
│ Font Weight: 700 (bold)
│ Color: white
│ Usage: Project names in cards
│
Body Text (Large)
│ Font Size: 16px (text-base)
│ Font Weight: 400
│ Color: slate-200
│ Usage: Button text, form labels
│
Body Text (Small)
│ Font Size: 14px (text-sm)
│ Font Weight: 400
│ Color: slate-400
│ Usage: Helper text, metadata
│
Body Text (XSmall)
│ Font Size: 12px (text-xs)
│ Font Weight: 400
│ Color: slate-500
│ Usage: Timestamps, captions
```

---

## 🖼️ Page Layout

### **Dashboard Page Structure**

```
┌────────────────────────────────────────────────────────────┐
│                   Gradient Background                      │
│           (from-slate-900 via-slate-800 to-slate-900)    │
│                                                            │
│   ┌──────────────────────────────────────────────────┐   │
│   │  TITLE SECTION                    NEW PROJECT BTN │   │
│   │  "Project Dashboard"              [+ New Project]│   │
│   │  "Manage your portfolio projects"                 │   │
│   └──────────────────────────────────────────────────┘   │
│                                                            │
│   ┌──────────────────────────────────────────────────┐   │
│   │  [Optional] NOTIFICATION TOAST                   │   │
│   │  ✓ Project created successfully                  │   │
│   │                                                  │   │
│   │  ✗ Failed to delete project                      │   │
│   └──────────────────────────────────────────────────┘   │
│                                                            │
│   ┌──────────────────────────────────────────────────┐   │
│   │  [When Open] PROJECT FORM SECTION                │   │
│   │                                                  │   │
│   │  Title:           [________________]             │   │
│   │  Description:     [________________]             │   │
│   │                   [________________]             │   │
│   │                                                  │   │
│   │  GitHub URL:     [________]  LinkedIn URL: [__] │   │
│   │                                                  │   │
│   │  Skills:          [Add skill    ────────]       │   │
│   │                   [React] [Tailwind] [🔧 +2]    │   │
│   │                                                  │   │
│   │  Image:          [📷 Click to upload]            │   │
│   │                                                  │   │
│   │  [Update/Create Project]  [Cancel]              │   │
│   └──────────────────────────────────────────────────┘   │
│                                                            │
│   PROJECTS GRID (Responsive)                             │
│   ┌──────────────┬──────────────┬──────────────┐        │
│   │              │              │              │        │
│   │   PROJECT 1  │   PROJECT 2  │   PROJECT 3  │        │
│   │              │              │              │        │
│   ├──────────────┼──────────────┼──────────────┤        │
│   │ Project 4    │ Project 5    │ Project 6    │        │
│   └──────────────┴──────────────┴──────────────┘        │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 💳 Project Card Design

### **Visual Layout**

```
┌────────────────────────────────────┐
│  [Image Container 56 height]       │  ← Image with gradient overlay
│  🖼️  [On Hover: Overlay Buttons]    │
│      [Edit] [Delete]               │
├────────────────────────────────────┤
│ Project Title (line-clamp-2)       │ ← 2 lines max, bold
│                                    │
│ Project description appears here   │ ← 3 lines max, truncated
│ and can span multiple lines if     │   with "..."
│ the description is long enough     │
│                                    │
│ [React] [TypeScript] [Tailwind... +2] │ ← Skill tags
│                                    │
│ [GitHub Link] [LinkedIn Link]      │ ← External links
│                                    │
├────────────────────────────────────┤
│ Updated 2/15/2025                  │ ← Footer meta
└────────────────────────────────────┘
```

### **Hover State Effects**

```
Default State:
├─ Border: slate-700 (subtle)
├─ Shadow: none
└─ Image: normal scale

Hover State:
├─ Border: indigo-500 (glowing effect)
├─ Shadow: shadow-2xl shadow-indigo-500/20
├─ Image Scale: scale-110 (zoom effect)
├─ Overlay: bg-black/60 (darkened)
└─ Buttons: [Edit] [Delete] visible
```

---

## 📝 Form Component

### **Form Layout**

```
┌─────────────────────────────────────────────┐
│ FORM TITLE                                  │
│ "Add New Project"  or  "Edit Project"       │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ FIELD: Project Title                        │
│ [Input Field - Full Width]                  │
│                                             │
│ FIELD: Description                          │
│ [Textarea - 4 Rows]                         │
│ [Textarea - 4 Rows]                         │
│                                             │
│ FIELDS: URLs (Side by Side)                 │
│ [GitHub URL Input] | [LinkedIn URL Input]   │
│                                             │
│ FIELD: Skills                               │
│ [Skill Input] [Add Button]                  │
│ [React] [TypeScript] [Tailwind CSS]         │
│                                             │
│ FIELD: Image Upload                         │
│ ┌─────────────────────────────────────────┐ │
│ │  📷                                     │ │
│ │  Click to upload image                  │ │
│ │  PNG, JPG up to 5MB                     │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ [Create Project Button] [Cancel Button]     │
└─────────────────────────────────────────────┘
```

### **Input Field States**

```
Default State:
├─ Background: bg-slate-700
├─ Border: border-slate-600 (1px)
├─ Text: text-white
├─ Placeholder: text-slate-400
└─ Cursor: pointer

Focus State:
├─ Ring: focus:ring-2 focus:ring-indigo-500
├─ Outline: focus:outline-none
└─ Border: remains slate-600

Disabled State:
├─ Opacity: opacity-50
├─ Cursor: cursor-not-allowed
└─ Interaction: disabled
```

### **Button States**

```
Primary Button (Submit):
├─ Default:  bg-indigo-600, text-white
├─ Hover:    bg-indigo-700, shadow-lg
├─ Active:   bg-indigo-800
├─ Disabled: opacity-50, cursor-not-allowed
└─ Loading:  opacity-50, show spinner/text

Secondary Button (Cancel):
├─ Default:  bg-slate-700, text-slate-200
├─ Hover:    bg-slate-600
├─ Disabled: opacity-50
└─ Transition: all 200ms

Danger Button (Delete):
├─ Default:  bg-red-600, text-white
├─ Hover:    bg-red-700, shadow-lg
└─ Disabled: opacity-50, cursor-not-allowed
```

---

## 🎯 Notification Toast

### **Visual Design**

```
Success Toast:
┌──────────────────────────────────────────────┐
│ bg-emerald-900/80 border-l-4 border-emerald │
│                                              │
│ ✓ Project created successfully              │
│                                              │ ← [Close ×]
│ text: emerald-100                            │
└──────────────────────────────────────────────┘
Appears: Top-right of main content
Duration: 5 seconds auto-clear
Animation: fade-in, slide-in-from-top

Error Toast:
┌──────────────────────────────────────────────┐
│ bg-red-900/80 border-l-4 border-red          │
│                                              │
│ ✗ Failed to upload image                     │
│                                              │ ← [Close ×]
│ text: red-100                                │
└──────────────────────────────────────────────┘
```

### **Notification Messages**

```
Success Messages:
├─ "Project created successfully"
├─ "Project updated successfully"
└─ "Project deleted successfully"

Error Messages:
├─ "Failed to load projects"
├─ "Failed to create project"
├─ "Failed to update project"
├─ "Failed to delete project"
├─ "Failed to upload image"
├─ "Image size must be less than 5MB"
└─ "Please select a valid image file"
```

---

## 📱 Responsive Breakpoints

### **Mobile (< 640px)**

```
┌─────────────────────┐
│ PROJECT DASHBOARD   │ ← Title stacked
│ [+ New Project]     │ ← Button full width
│ Manage projects     │
├─────────────────────┤
│ PROJECTS GRID       │ ← 1 column
│ ┌─────────────────┐ │
│ │  PROJECT 1      │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │  PROJECT 2      │ │
│ └─────────────────┘ │
└─────────────────────┘
```

### **Tablet (640px - 1024px)**

```
┌──────────────────────────────────────┐
│ PROJECT DASHBOARD  [+ New Project]   │ ← Row layout
│ Manage portfolio projects            │
├──────────────────────────────────────┤
│ PROJECTS GRID   ← 2 columns          │
│ ┌──────────────┬──────────────┐      │
│ │ PROJECT 1    │  PROJECT 2   │      │
│ ├──────────────┼──────────────┤      │
│ │ PROJECT 3    │  PROJECT 4   │      │
│ └──────────────┴──────────────┘      │
└──────────────────────────────────────┘
```

### **Desktop (1024px+)**

```
┌──────────────────────────────────────────────────────────┐
│ PROJECT DASHBOARD       Manage projects  [+ New Project] │
├──────────────────────────────────────────────────────────┤
│ PROJECTS GRID   ← 3 columns                              │
│ ┌──────────────┬──────────────┬──────────────┐           │
│ │ PROJECT 1    │  PROJECT 2   │  PROJECT 3   │           │
│ ├──────────────┼──────────────┼──────────────┤           │
│ │ PROJECT 4    │  PROJECT 5   │  PROJECT 6   │           │
│ └──────────────┴──────────────┴──────────────┘           │
└──────────────────────────────────────────────────────────┘
```

---

## 🎬 Component Animations

### **Fade-In Animation**

```css
/* Notification toasts */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

Duration: 300ms
Timing: ease-in
```

### **Slide-In Animation**

```css
/* Notifications slide from top */
@keyframes slide-in-from-top {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

Duration: 300ms
Timing: ease-out
```

### **Scale Animation**

```css
/* Image zoom on card hover */
transform: scale(1.1)
transition: transform 300ms ease-in-out
```

### **Spin Animation**

```css
/* Loading spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

Duration: 1s
Iteration: infinite
```

---

## 👥 User Experience Flow

### **Create Project Flow**

```
1. Dashboard Page
       │
2. Click "+ New Project"
       │
3. Form Opens
   ├─ Fill fields
   ├─ Add skills
   ├─ Upload image
       │
4. Click "Create Project"
       │
5. Async operations:
   ├─ Upload image to storage
   ├─ Create project in database
       │
6. Success notification
   ├─ Form closes
   ├─ Projects list reloads
   ├─ New project appears in grid
       │
7. User sees project in dashboard
```

### **Edit Project Flow**

```
1. Dashboard with projects
       │
2. Hover over project card
   └─ Edit/Delete buttons appear
       │
3. Click "Edit"
       │
4. Form opens with current data
   ├─ Title, description pre-filled
   ├─ Skills pre-populated
   ├─ Image preview shown
       │
5. User modifies fields
       │
6. Click "Update Project"
       │
7. Async operations:
   ├─ Upload new image (if changed)
   ├─ Update project in database
       │
8. Success notification
   ├─ Form closes
   ├─ Projects list reloads
   ├─ Updated project refreshes in grid
```

### **Delete Project Flow**

```
1. Hover over project card
       │
2. Click "Delete"
       │
3. Browser confirmation:
   "Are you sure you want to delete this project?"
       │
   [Cancel] or [OK]
       │
4a. Cancel: Return to dashboard
4b. OK: Continue
       │
5. Async operations:
   ├─ Delete image from storage
   ├─ Delete project from database
       │
6. Success notification
   ├─ Projects list reloads
   ├─ Project removed from grid
```

---

## 🎨 Skill Tag Design

### **Visual States**

```
Default (in form field):
┌──────────────┐
│ React   [×]  │ ← Can remove by clicking ×
└──────────────┘
Background: indigo-600/20
Border: indigo-500/50
Text: indigo-200
Hover: opacity-80

In Grid Card:
┌────────┐
│ React  │ ← Display only, read-only
└────────┘
Background: indigo-600/30
Border: indigo-500/30
Text: indigo-200
```

### **Skill Tag Input**

```
[Input Field] [Add Button]
   │              │
   └──────────────┘
         │
   User types:
   "React"
         │
   Presses Enter or clicks Add
         │
   Added to array:
   [React]
         │
   Input clears
   Ready for next skill
```

---

## 🔍 Empty State

```
When no projects exist:

┌──────────────────────────────────┐
│   NO PROJECTS YET                │
│   [Placeholder content]          │
│                                  │
│   Create your first project →    │
│                                  │
│   (clickable text link)          │
└──────────────────────────────────┘

Background: slate-800
Border: slate-700
Text: slate-400 (secondary text)
Link: indigo-400 with hover
```

---

## ⏳ Loading State

```
Initial Page Load:

┌──────────────────────────────────┐
│         [Spinner ⟳]             │
│                                  │
│      Loading projects...         │
│                                  │
│   (animated circular spinner)    │
└──────────────────────────────────┘

Spinner:
├─ Size: 12 height/width (h-12 w-12)
├─ Border: 2px bottom border
├─ Color: indigo-600
└─ Animation: spin 1s infinite linear

Duration: Until projects load
```

---

## 🎯 Accessibility Features

### **Keyboard Navigation**

```
Tab Order:
1. Header title
2. "+ New Project" button
3. Notification close button
4. Form fields (if open)
5. Project card action buttons
6. External links (GitHub, LinkedIn)

Enter Key:
├─ Open/Close form
├─ Submit form
├─ Add skill tag
└─ Confirm delete

Escape Key:
└─ Close form (future enhancement)
```

### **Focus Indicators**

```
Focus Ring:
├─ Color: indigo-500
├─ Offset: 2px
├─ Width: 2px
└─ Visible on: inputs, buttons, links

Focus Visibility:
├─ Visible: All interactive elements
├─ Color Contrast: WCAG AA compliant
└─ Min size: 48x48px for touch targets
```

---

## 📐 Spacing System

```
Padding:
├─ Page: px-4 (mobile), px-6 (tablet), px-8 (desktop)
├─ Card: p-5 (content), p-3 (footer)
├─ Input: px-4 py-2
└─ Button: px-6 py-2

Margin:
├─ Sections: mb-12 (between major sections)
├─ Submit: pt-6 (top border spacing)
├─ Form items: space-y-6
└─ Grid gap: gap-6

Border Radius:
├─ Inputs: rounded-lg (8px)
├─ Cards: rounded-xl (12px)
├─ Buttons: rounded-lg (8px)
└─ Tags: rounded-full (9999px)
```

---

**Last Updated**: March 27, 2026
**Version**: 1.0.0
**Design System**: Tailwind CSS v4 + Slate/Indigo palette
