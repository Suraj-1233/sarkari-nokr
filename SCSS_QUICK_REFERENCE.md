# 🎯 SCSS QUICK REFERENCE CARD

**Sarkari Service Frontend - Keep This Handy!**

---

## 📌 MOST USED VARIABLES

```scss
// ===== COLORS =====
$color-primary        #9d2235  // Brand red
$color-primary-dark   #8b1e2f  // Darker version
$color-primary-light  #c92a42  // Lighter version
$color-success        #28a745  // Green - success
$color-danger         #dc3545  // Red - error
$color-warning        #ffc107  // Yellow - warning
$color-text           #333    // Main text
$color-bg             #fff    // White background
$color-border         #ddd    // Gray borders

// ===== SPACING (8px grid) =====
$space-sm   8px     // Small gaps
$space-md   16px    // DEFAULT - most common
$space-lg   24px    // Section spacing
$space-xl   32px    // Large sections
```

---

## 🔨 MOST USED MIXINS

```scss
// Centering
@include flex-center()          // Center everything
@include flex-between()         // Space between items

// Layout
@include container()            // Responsive container
@include respond-to('tablet')   // Add tablet styles
@include respond-to('desktop')  // Add desktop styles

// Typography
@include heading($font-size-xl)           // Responsive heading
@include text-body($font-size-base)       // Normal text

// Interactive
@include focus-state()          // Keyboard focus styling
@include shadow-lift()          // Hover shadow effect
```

---

## ✅ COPY-PASTE PATTERNS

### Pattern 1: Component Container (Mobile-First)
```scss
.my-component {
  padding: $space-md;
  
  @include respond-to('tablet') {
    padding: $space-lg;
  }
  
  @include respond-to('desktop') {
    padding: $space-xl;
  }
}
```

### Pattern 2: Responsive Grid
```scss
.grid {
  display: grid;
  grid-template-columns: 1fr;  // Mobile: 1 col
  gap: $space-md;
  
  @include respond-to('tablet') {
    grid-template-columns: repeat(2, 1fr);  // Tablet: 2 cols
  }
  
  @include respond-to('desktop') {
    grid-template-columns: repeat(3, 1fr);  // Desktop: 3 cols
  }
}
```

### Pattern 3: Responsive Button
```scss
.btn {
  padding: $space-sm $space-lg;
  min-height: 44px;
  
  @include respond-to('mobile-only') {
    min-height: 48px;  // Touch-friendly
  }
  
  &:hover:not(:disabled) {
    background: $color-primary-light;
    transform: translateY(-2px);
  }
  
  &:focus {
    @include focus-state();
  }
}
```

### Pattern 4: Form Input
```scss
input {
  padding: $space-sm $space-md;
  border: 2px solid $color-border-light;
  border-radius: 8px;
  
  &:focus {
    outline: none;
    border-color: $color-primary;
    box-shadow: 0 0 0 3px rgba(157, 34, 53, 0.1);
  }
  
  &.error {
    border-color: $color-danger;
  }
}
```

### Pattern 5: Responsive Table
```scss
.table-wrapper {
  overflow-x: auto;
  margin: $space-lg 0;
  
  @include respond-to('mobile-only') {
    margin-left: -$space-md;
    margin-right: -$space-md;
  }
}

table {
  width: 100%;
  
  @include respond-to('mobile-only') {
    min-width: 500px;  // Allow scroll
  }
}
```

---

## ❌ NEVER DO THIS

```scss
// ❌ Hardcoded colors
.btn { color: #9d2235; }           // Use $color-primary

// ❌ Hardcoded spacing
.card { padding: 16px; }           // Use $space-md

// ❌ Hardcoded sizes
h1 { font-size: 28px; }            // Use $font-size-2xl

// ❌ Desktop-first
.grid { grid-template-columns: repeat(3, 1fr); }  // Start with 1fr!

// ❌ Magic breakpoints
@media (min-width: 800px) { }      // Use @include respond-to()

// ❌ Inline styles in HTML
<div style="padding: 20px;">       // Move to SCSS!

// ❌ Bootstrap + custom mixed
class="btn btn-primary mb-3"       // Use unified .btn system
```

---

## 🎨 COLOR QUICK PICK

| Use | Variable |
|-----|----------|
| **Button** | `$color-primary` |
| **Links** | `$color-primary` (hover: `$color-primary-light`) |
| **Success message** | `$color-success` |
| **Error message** | `$color-danger` |
| **Warning message** | `$color-warning` |
| **Main text** | `$color-text` |
| **Light text** | `$color-text-light` |
| **Backgrounds** | `$color-bg` or `$color-bg-light` |
| **Borders** | `$color-border` or `$color-border-light` |

---

## 📱 RESPONSIVE QUICK PICK

| Screen | Min-width | When to Use | Pattern |
|--------|-----------|-------------|---------|
| **Mobile** | - | Default styles | Write this first! |
| **Tablet** | 768px | 2-column layouts | `@include respond-to('tablet')` |
| **Desktop** | 1024px | 3+ column layouts | `@include respond-to('desktop')` |
| **Mobile only** | - | Hide on larger screens | `@include respond-to('mobile-only')` |

---

## 📏 SPACING QUICK PICK

| Size | Value | When to Use |
|------|-------|-------------|
| `$space-xs` | 4px | Rare, very tight spacing |
| `$space-sm` | 8px | Small gaps, form margins |
| `$space-md` | **16px** | **DEFAULT** - use most! |
| `$space-lg` | 24px | Section spacing, card padding |
| `$space-xl` | 32px | Large sections, page margins |
| `$space-2xl` | 40px | Form containers, huge spacing |

---

## 🔤 TYPOGRAPHY QUICK PICK

| Size | Value | Use For |
|------|-------|---------|
| `$font-size-xs` | 12px | Small labels, hints |
| `$font-size-sm` | 14px | Form labels, captions |
| `$font-size-base` | 16px | **DEFAULT** body text |
| `$font-size-lg` | 18px | Subheadings |
| `$font-size-xl` | 24px | H3, important text |
| `$font-size-2xl` | 28px | H2 |
| `$font-size-3xl` | 32px | H1, page title |

---

## 🎯 CHECKLIST BEFORE SUBMITTING PR

- [ ] No hardcoded `#colors` (use `$color-*` variables)
- [ ] No hardcoded `px` spacing (use `$space-*` variables)
- [ ] Mobile styles are DEFAULT, then `@include respond-to()` for larger screens
- [ ] Touch-friendly buttons: min-height 44px (mobile) or 48px
- [ ] Proper focus states: `@include focus-state()` or outline
- [ ] No Bootstrap classes in HTML (use `.btn`, `.card` instead)
- [ ] No `style="..."` inline styles
- [ ] Responsive at: 375px (mobile), 768px (tablet), 1024px (desktop)
- [ ] Tested on phone (not just DevTools!)

---

## 🆘 HELP! MY COMPONENT IS BROKEN

**Issue: Styles not applying**
```scss
// Did you forget the import?
@import '../../styles';
```

**Issue: Colors look wrong**
```scss
// Use variable, not hardcoded
color: $color-primary;  // Not #9d2235
```

**Issue: Mobile looks cramped**
```scss
// Check spacing is responsive
padding: $space-md;  // Mobile default
@include respond-to('tablet') { padding: $space-lg; }
```

**Issue: Text too small on phone**
```scss
// Use responsive font size
font-size: $font-size-base;  // 16px on mobile
@include respond-to('tablet') { font-size: $font-size-lg; }
```

**Issue: Button not clickable on mobile**
```scss
// Make touch-friendly
min-height: 48px;  // At least 44px
padding: $space-md $space-lg;
```

**Issue: Table scrolls horizontally**
```scss
// See SCSS_BEST_PRACTICES.md → Table component pattern
```

---

## 📚 SEE FULL GUIDES

| File | Purpose |
|------|---------|
| `styles.scss` | Complete design system (copy to project) |
| `COMPONENT_SCSS_REFACTOR.md` | Real component examples |
| `SCSS_BEST_PRACTICES.md` | Comprehensive best practices |
| `UI_DESIGN_REFACTOR_SUMMARY.md` | Executive summary |

---

## 🚀 NEW COMPONENT TEMPLATE

```scss
// 1. Always import at top
@import '../../styles';

// 2. Component container (mobile-first)
.my-component {
  padding: $space-md;
  color: $color-text;
  background: $color-bg;
  border-radius: 8px;
  
  @include respond-to('tablet') {
    padding: $space-lg;
  }
  
  @include respond-to('desktop') {
    padding: $space-xl;
  }
}

// 3. Child elements (BEM naming optional)
.my-component__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $space-lg;
}

// 4. Interactions
.my-component__button {
  background: $color-primary;
  padding: $space-sm $space-lg;
  min-height: 44px;
  
  &:hover:not(:disabled) {
    background: $color-primary-light;
    transform: translateY(-2px);
  }
  
  &:focus {
    @include focus-state();
  }
}
```

---

## ⚡ QUICK WINS

**Want faster development? Use these shortcuts:**

```scss
// Instead of writing the whole thing...
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

// ...just use the mixin!
.flex {
  @include flex-center();
}

// Instead of writing breakpoints...
.responsive {
  width: 100%;
  @media (min-width: 768px) { width: 80%; }
  @media (min-width: 1024px) { width: 60%; }
}

// ...use the mixin!
.responsive {
  width: 100%;  // Mobile
  @include respond-to('tablet') { width: 80%; }
  @include respond-to('desktop') { width: 60%; }
}
```

---

## 📞 WHEN IN DOUBT

1. Check `SCSS_BEST_PRACTICES.md`
2. Look at `COMPONENT_SCSS_REFACTOR.md` examples
3. Ask: "Is there a variable for this?" (colors, spacing, fonts)
4. Ask: "Is there a mixin for this?" (flex, grid, responsive)
5. If not, it might be a new pattern to document!

---

**Remember: No hardcoded values. Always use variables!** 🎨

