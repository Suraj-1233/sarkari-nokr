# 📋 SCSS BEST PRACTICES & MAINTENANCE GUIDE

**Sarkari Service - Frontend Styling Standards**

---

## 📌 TABLE OF CONTENTS

1. [SCSS Architecture](#scss-architecture)
2. [Color & Spacing System](#color--spacing-system)
3. [Responsive Design Patterns](#responsive-design-patterns)
4. [Component Structure](#component-structure)
5. [Naming Conventions](#naming-conventions)
6. [Common Patterns & Shortcuts](#common-patterns--shortcuts)
7. [DO's & DON'Ts](#dos--donts)
8. [Implementation Checklist](#implementation-checklist)
9. [Troubleshooting Guide](#troubleshooting-guide)

---

## SCSS Architecture

### **File Structure**

```
frontend/src/
├── styles.scss                          # Global design system
├── app/
│   ├── app.component.scss
│   ├── users/
│   │   ├── header/
│   │   │   └── header.component.scss    # Imports @import 'styles'
│   │   ├── login/
│   │   │   └── login.component.scss
│   │   └── [other components]/
│   └── shared/
│       └── dialogs/
│           └── [dialog components]/
└── ...
```

### **How to Set Up Component SCSS**

1. **Rename `.css` to `.scss`:**
   ```bash
   mv header.component.css header.component.scss
   ```

2. **Always Import Global Styles:**
   ```scss
   @import '../../styles'; // Adjust path as needed
   
   // Now you can use all variables and mixins
   .component {
     color: $color-primary;
     padding: $space-md;
   }
   ```

3. **Update `component.ts`:**
   ```typescript
   @Component({
     selector: 'app-header',
     templateUrl: './header.component.html',
     styleUrls: ['./header.component.scss']  // Change .css to .scss
   })
   export class HeaderComponent { }
   ```

4. **Update `angular.json`:**
   ```json
   {
     "schematics": {
       "@schematics/angular:component": {
         "style": "scss"  // Generate .scss by default for new components
       }
     }
   }
   ```

---

## Color & Spacing System

### **Color Palette (Always Use Variables)**

```scss
// Primary Brand Colors
$color-primary: #9d2235;        // Use for buttons, links, highlights
$color-primary-dark: #8b1e2f;   // Hover states
$color-primary-light: #c92a42;  // Alternate primary
$color-primary-lighter: rgba(157, 34, 53, 0.1);  // Light background

// Neutral Colors
$color-text: #333;              // Main text
$color-text-light: #666;        // Secondary text
$color-text-lighter: #999;      // Tertiary text
$color-bg: #fff;                // Component backgrounds
$color-bg-light: #f9f9f9;       // Light backgrounds
$color-border: #ddd;            // Borders
$color-border-light: #e0e0e0;   // Light borders

// Status Colors
$color-success: #28a745;        // Success state
$color-danger: #dc3545;         // Error/danger state
$color-warning: #ffc107;        // Warning state
$color-info: #17a2b8;           // Info state
```

### **Spacing Scale (8px Base Unit)**

```scss
$space-xs: 4px;      // Half unit - use rarely
$space-sm: 8px;      // 1 unit   - form gaps, tight spacing
$space-md: 16px;     // 2 units  - default padding/margin
$space-lg: 24px;     // 3 units  - section spacing
$space-xl: 32px;     // 4 units  - large spacing
$space-2xl: 40px;    // 5 units  - extra large spacing
```

### **When to Use Each Spacing Value**

| Value | Use Cases |
|-------|-----------|
| `$space-xs` (4px) | Border radius offsets, tight button gaps |
| `$space-sm` (8px) | Input borders, small gaps, list item margin |
| `$space-md` (16px) | **DEFAULT** - padding, margins, regular gaps |
| `$space-lg` (24px) | Section spacing, card padding, headers |
| `$space-xl` (32px) | Page margins, large containers |
| `$space-2xl` (40px) | Form containers, extra large sections |

### **Example: Using Spacing System**

```scss
// ❌ WRONG - Hardcoded values
.card {
  padding: 15px;
  margin-bottom: 20px;
  gap: 10px;
}

// ✅ RIGHT - Using spacing system
.card {
  padding: $space-md;          // 16px
  margin-bottom: $space-lg;    // 24px
  gap: $space-md;              // 16px
}

// ✅ ALSO RIGHT - Custom combinations
.card {
  padding: $space-lg $space-md; // 24px top/bottom, 16px left/right
  margin-bottom: $space-lg;     // 24px
}
```

---

## Responsive Design Patterns

### **Mobile-First Approach**

**Always write styles for mobile first, then override for larger screens.**

```scss
// ❌ WRONG - Desktop first (old approach)
.component {
  width: 1000px;  // Desktop
  padding: 40px;
}

@media (max-width: 768px) {
  .component {
    width: 100%;
    padding: 20px;
  }
}

// ✅ RIGHT - Mobile first
.component {
  width: 100%;     // Mobile
  padding: $space-md;

  @include respond-to('tablet') {
    width: 80%;
    padding: $space-lg;
  }

  @include respond-to('desktop') {
    width: 100%;
    max-width: 1200px;
    padding: $space-xl;
  }
}
```

### **Breakpoint Usage**

```scss
// Mobile (default)
// No media query needed - this is your base style

// Tablet and up
@include respond-to('tablet') {
  // min-width: 768px
}

// Desktop and up
@include respond-to('desktop') {
  // min-width: 1024px
}

// Mobile only (explicitly exclude tablet+)
@include respond-to('mobile-only') {
  // max-width: 767px
}
```

### **Responsive Grid Pattern**

```scss
// ✅ Recommended: Auto-fit grid that adapts to screen size
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: $space-lg;
}

// ✅ Controlled grid: 1 col mobile, 2 tablet, 3+ desktop
.grid-controlled {
  display: grid;
  grid-template-columns: 1fr;  // Mobile: 1 column
  gap: $space-md;

  @include respond-to('tablet') {
    grid-template-columns: repeat(2, 1fr);  // Tablet: 2 columns
  }

  @include respond-to('desktop') {
    grid-template-columns: repeat(3, 1fr);  // Desktop: 3 columns
  }
}
```

### **Text Scaling Pattern**

```scss
h1 {
  font-size: $font-size-lg;      // Mobile: 18px
  
  @include respond-to('tablet') {
    font-size: $font-size-2xl;   // Tablet: 28px
  }

  @include respond-to('desktop') {
    font-size: $font-size-3xl;   // Desktop: 32px
  }
}

// OR use responsive mixin
h1 {
  @include heading($font-size-2xl); // Automatically responsive
}
```

---

## Component Structure

### **Typical Component SCSS Template**

```scss
/**
 * Component Name
 * Description of what this component does
 */

@import '../../../styles';  // Adjust path for your folder depth

// ============================================================================
// VARIABLES (Component-specific only - use global vars when possible)
// ============================================================================

// Local vars ONLY if not in global system
// Avoid: $local-color: #abc123;  ← Don't do this

// ============================================================================
// COMPONENT CONTAINER
// ============================================================================

.component-name {
  @include container();  // or @include flex-center() or @include grid()
  
  // Base styles (mobile)
  padding: $space-md;
  
  // Tablet
  @include respond-to('tablet') {
    padding: $space-lg;
  }
  
  // Desktop
  @include respond-to('desktop') {
    padding: $space-xl;
  }
}

// ============================================================================
// CHILD ELEMENTS
// ============================================================================

.component-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $space-lg;
  padding-bottom: $space-md;
  border-bottom: 1px solid $color-border;

  h2 {
    margin: 0;
    font-size: $font-size-xl;
    
    @include respond-to('mobile-only') {
      font-size: $font-size-lg;
    }
  }
}

.component-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: $space-md;

  @include respond-to('tablet') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('desktop') {
    grid-template-columns: repeat(3, 1fr);
  }
}

.component-item {
  padding: $space-md;
  background: $color-bg;
  border: 1px solid $color-border;
  border-radius: $border-radius-md;
  transition: all $transition-normal;

  &:hover {
    box-shadow: $shadow-lg;
    transform: translateY(-2px);
  }

  &:focus-within {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }
}

.component-footer {
  display: flex;
  gap: $space-md;
  margin-top: $space-lg;
  justify-content: flex-end;

  @include respond-to('mobile-only') {
    flex-direction: column;
    justify-content: stretch;

    button {
      width: 100%;
    }
  }
}
```

---

## Naming Conventions

### **CSS Class Naming**

Use **BEM (Block Element Modifier)** pattern:

```scss
// Block = main component
.card { }

// Element = part of block (__ separator)
.card__header { }
.card__body { }
.card__footer { }

// Modifier = variation (-- separator)
.card--elevated { }
.card--compact { }
.card__header--dark { }
```

### **Example with BEM:**

```html
<!-- HTML -->
<div class="card card--elevated">
  <div class="card__header card__header--dark">
    <h2 class="card__title">Title</h2>
  </div>
  <div class="card__body">
    <p>Content</p>
  </div>
</div>
```

```scss
// SCSS
.card {
  background: $color-bg;
  border-radius: $border-radius-lg;
  overflow: hidden;

  // Element
  &__header {
    padding: $space-lg;
    background: $color-bg-light;
    border-bottom: 1px solid $color-border;
  }

  &__title {
    margin: 0;
    font-size: $font-size-xl;
  }

  &__body {
    padding: $space-lg;
  }

  // Modifiers
  &--elevated {
    box-shadow: $shadow-lg;

    &:hover {
      box-shadow: $shadow-xl;
    }
  }

  &--compact {
    &__header,
    &__body {
      padding: $space-md;
    }
  }

  &__header--dark {
    background: $color-tertiary;
    color: $color-bg;
  }
}
```

### **Utility Class Naming**

```scss
// Utilities: .{property}-{value}
.mt-2  { margin-top: $space-md; }
.mb-3  { margin-bottom: $space-lg; }
.p-1   { padding: $space-sm; }
.text-primary { color: $color-primary; }
.flex  { display: flex; }
.hidden { display: none; }
```

---

## Common Patterns & Shortcuts

### **1. Centering (Multiple Ways)**

```scss
// Flex center (recommended)
.center {
  @include flex-center();  // Center content in all directions
}

// Manual flex
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $space-md;
}

// Grid center
.center {
  display: grid;
  place-items: center;
}
```

### **2. Responsive Padding**

```scss
// Quick responsive padding
.box {
  @include padding-responsive(
    $mobile: $space-md,
    $tablet: $space-lg,
    $desktop: $space-xl
  );
}

// Manual approach
.box {
  padding: $space-md;

  @include respond-to('tablet') {
    padding: $space-lg;
  }

  @include respond-to('desktop') {
    padding: $space-xl;
  }
}
```

### **3. Truncate Text**

```scss
// Single line truncation
.truncate-single {
  @include truncate(1);
  // Produces: white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

// Multi-line truncation (3 lines)
.truncate-multi {
  @include truncate(3);
  // Produces: display: -webkit-box; -webkit-line-clamp: 3; etc.
}
```

### **4. Shadow Lift on Hover**

```scss
.card {
  @include shadow-lift();  // Auto hover shadow effect
}

// Or custom shadow
.card {
  @include shadow-lift($shadow-lg);
}
```

### **5. Focus State**

```scss
// Standard focus
button {
  &:focus-visible {
    @include focus-state();  // 2px outline with offset
  }
}

// Custom color focus
button {
  &:focus-visible {
    @include focus-state($color-primary-light);
  }
}
```

### **6. Responsive Container**

```scss
.container {
  @include container();  // Handles width, max-width, padding, margin
}

// Or custom width
.container-narrow {
  @include container($max-width: 800px, $padding: $space-md);
}
```

---

## DO's & DON'Ts

### **✅ DO's**

```scss
// ✅ Use variables
.button {
  color: $color-primary;
  padding: $space-md;
  margin-bottom: $space-lg;
}

// ✅ Use mixins
.flex-center {
  @include flex-center();
}

// ✅ Mobile-first
.element {
  font-size: $font-size-base;  // Mobile default
  
  @include respond-to('tablet') {
    font-size: $font-size-lg;
  }
}

// ✅ Use nesting for child elements & modifiers
.card {
  padding: $space-lg;
  
  &__header {
    border-bottom: 1px solid $color-border;
  }
  
  &:hover {
    box-shadow: $shadow-lg;
  }
  
  &--compact {
    padding: $space-md;
  }
}

// ✅ Semantic HTML + CSS
button {
  min-height: 44px;  // Touch-friendly
  @include focus-state();
}

// ✅ Use transitions for interactions
.element {
  transition: all $transition-normal;
  
  &:hover {
    color: $color-primary-light;
  }
}

// ✅ Group related styles
.header {
  // Layout
  display: flex;
  gap: $space-md;
  
  // Spacing
  padding: $space-lg;
  margin-bottom: $space-xl;
  
  // Styling
  background: $color-bg;
  border-radius: $border-radius-lg;
  
  // Effects
  box-shadow: $shadow-md;
  transition: all $transition-normal;
}
```

### **❌ DON'Ts**

```scss
// ❌ NO hardcoded values
.button {
  color: #9d2235;        // ← Use $color-primary
  padding: 16px;         // ← Use $space-md
  margin-bottom: 24px;   // ← Use $space-lg
}

// ❌ NO inline styles in HTML
<div style="padding: 20px; margin-bottom: 15px;">  // ← Move to SCSS

// ❌ NO magic numbers
.component {
  margin-left: 42px;  // Why 42? ← Use spacing variables
  font-size: 17px;    // Random size ← Use typography scale
}

// ❌ NO desktop-first approach
.element {
  width: 1200px;      // Start with large
  
  @media (max-width: 768px) {
    width: 100%;      // Then shrink
  }
}

// ❌ NO repeated CSS across components
// (header.scss & footer.scss both have):
.box-shadow { box-shadow: 0 4px 8px rgba(0,0,0,0.1); }

// Instead: Put in global styles or mixin

// ❌ NO deeply nested selectors
.header {
  .nav {
    .item {
      .link {
        color: red;  // Avoid 4+ levels of nesting
      }
    }
  }
}

// ❌ NO Bootstrap classes mixed with custom
<div class="btn btn-primary mb-3 me-2 d-flex align-items-center">

// Instead: Use unified .btn system or utility classes

// ❌ NO fixed widths on responsive containers
.container {
  width: 1000px;  // ← Forces overflow on mobile
  
  // Instead:
  width: 100%;
  max-width: 1000px;
  @include respond-to('mobile-only') {
    padding: 0 $space-md;
  }
}

// ❌ NO !important (almost never needed)
.element {
  color: red !important;  // Indicates poor specificity planning
}

// ❌ NO animations without purpose
.element {
  animation: slideIn 5s ease infinite;  // Distracting, not useful
}
```

---

## Implementation Checklist

### **Phase 1: Global Setup (1-2 hours)**

- [ ] Delete old `styles.css`
- [ ] Create new `styles.scss` (use the global styles provided)
- [ ] Update `angular.json` for SCSS default
- [ ] Test that global styles load (check in browser DevTools)

### **Phase 2: Convert Components (4-6 hours per component)**

For each component file:

- [ ] Rename `.css` → `.scss`
- [ ] Update `component.ts` styleUrls
- [ ] Add `@import '../../styles'` at top of SCSS
- [ ] Replace hardcoded colors with variables (find & replace)
- [ ] Replace hardcoded spacing with variables (find & replace)
- [ ] Add mobile-first responsive breakpoints
- [ ] Remove Bootstrap classes from HTML
- [ ] Test on mobile (DevTools or actual device)
- [ ] Verify no horizontal scrolling

### **Priority Order for Conversion:**

1. **Header** (most visible) → See `COMPONENT_SCSS_REFACTOR.md`
2. **Login Form** (critical path)
3. **Tables** (common, complex)
4. **Post Input Form** (admin, internal use)
5. **All other components**

### **Phase 3: Testing & Refinement (2-3 hours)**

- [ ] Mobile responsiveness (375px, 768px, 1024px+ widths)
- [ ] Touch interactions (hover states work on desktop, not on mobile)
- [ ] Accessibility (keyboard nav, focus states, screen reader)
- [ ] Performance (check DevTools Lighthouse)
- [ ] Cross-browser (Chrome, Safari, Firefox)
- [ ] Lighthouse score ≥ 90

### **Phase 4: Documentation & Handoff**

- [ ] Update `COMPONENT_SCSS_REFACTOR.md` with final patterns
- [ ] Document any custom variables added for team
- [ ] Create SCSS style guide for future developers
- [ ] Add code review checklist for CSS PRs

---

## Troubleshooting Guide

### **Problem: Styles not applying**

```scss
// ❌ Did you forget @import?
.my-component {
  color: $color-primary;  // Variable not defined!
}

// ✅ Add import at top
@import '../../styles';

.my-component {
  color: $color-primary;  // Now works
}
```

### **Problem: Media query not working**

```scss
// ❌ Wrong breakpoint name
@media (min-width: 800px) {  // What size is this?
  .element { font-size: 20px; }
}

// ✅ Use provided mixin
@include respond-to('tablet') {  // min-width: 768px (clear!)
  .element { font-size: $font-size-lg; }
}
```

### **Problem: Spacing inconsistent**

```scss
// ❌ Mixed spacing values
.section {
  padding: 15px;    // Why?
  margin-bottom: 18px;  // Why?
  gap: 20px;        // Why?
}

// ✅ Use consistent spacing
.section {
  padding: $space-md;      // 16px
  margin-bottom: $space-lg; // 24px
  gap: $space-lg;          // 24px
}
```

### **Problem: Mobile looks wrong**

```scss
// ❌ Forgot mobile-first approach
.grid {
  grid-template-columns: repeat(3, 1fr);  // 3 columns always
  // On mobile (375px), each column is 125px - too cramped!
}

// ✅ Mobile-first
.grid {
  grid-template-columns: 1fr;  // 1 column on mobile
  
  @include respond-to('tablet') {
    grid-template-columns: repeat(2, 1fr);  // 2 columns
  }
  
  @include respond-to('desktop') {
    grid-template-columns: repeat(3, 1fr);  // 3 columns
  }
}
```

### **Problem: Colors all look wrong after update**

**The `$color-primary` might have changed. Check `styles.scss` variable definitions.**

```scss
// View current colors
// In styles.scss, line ~20:
$color-primary: #9d2235;  // This is the source of truth

// If you hardcoded elsewhere:
.button { color: #c92a42; }  // ← This won't update when primary changes!

// Use the variable:
.button { color: $color-primary; }  // ← Updates everywhere automatically
```

### **Problem: Hover not working on mobile**

```scss
// ❌ Hover only (doesn't work on touch devices)
.button:hover {
  color: $color-primary-light;
}

// ✅ Add active/focus for mobile
.button {
  &:hover,
  &:active,
  &:focus {
    color: $color-primary-light;
  }
}

// ✅ Or better: Use data attributes
.button[data-active='true'],
.button:hover,
.button:focus {
  color: $color-primary-light;
}
```

### **Problem: Text too small on mobile**

```scss
// ❌ Fixed font size
.text { font-size: 14px; }  // Too small on mobile

// ✅ Responsive font size
.text {
  font-size: $font-size-base;  // 16px on mobile
  
  @include respond-to('tablet') {
    font-size: $font-size-lg;   // 18px on tablet
  }
}

// ✅ Or use predefined scale
h1 { @include heading($font-size-xl); }  // Auto-responsive
```

---

## Summary: CSS to SCSS Conversion Workflow

1. **Set up global system**: Copy provided `styles.scss`
2. **Convert each component**:
   - Rename `.css` → `.scss`
   - Add `@import '../../styles';`
   - Replace hardcoded values with variables
   - Add responsive breakpoints
3. **Test thoroughly**: Mobile, tablet, desktop, touch
4. **Document patterns**: Update team docs
5. **Maintain discipline**: Always use variables & mixins going forward

---

## Quick Reference Card

```scss
// Colors
$color-primary        // #9d2235 - main brand color
$color-success        // #28a745 - success state
$color-danger         // #dc3545 - error state

// Spacing
$space-sm  (8px)      // Tight spacing
$space-md  (16px)     // Default
$space-lg  (24px)     // Section spacing
$space-xl  (32px)     // Large spacing

// Responsive
@include respond-to('tablet')     // min-width: 768px
@include respond-to('desktop')    // min-width: 1024px
@include respond-to('mobile-only') // max-width: 767px

// Common Mixins
@include flex-center()            // Center in flexbox
@include flex-between()           // Space between
@include container()              // Responsive container
@include heading()                // Responsive heading
@include focus-state()            // Accessibility focus

// Typography
$font-size-base       // 16px
$font-size-sm         // 14px
$font-size-lg         // 18px
$font-size-xl, 2xl, 3xl // Larger sizes

// Transitions
$transition-fast      // 0.2s
$transition-normal    // 0.3s (default)
$transition-slow      // 0.5s
```

