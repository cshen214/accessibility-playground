# Accessibility Playground

An interactive full-stack web application that teaches and demonstrates accessible interface design through hands-on accessibility settings and interactive challenges.

Built with **Java, Spring Boot, HTML, CSS, and JavaScript**.

## About

Accessibility Playground is a web application designed to make accessibility concepts interactive and easier to understand.

Users can experiment with accessibility settings such as high contrast, reduced motion, and text resizing, then test their knowledge through interactive challenges that identify common accessibility issues.

The application uses a **Java Spring Boot backend** to provide challenge data, validate submitted answers, and track scores using server-side session state.

The project was built to explore how accessibility principles can be incorporated into both **user interface design and full-stack software development**.

### Accessibility Settings

- High contrast mode
- Reduced motion mode
- Adjustable text size
- Visible keyboard focus indicators
- Responsive layout
- Screen-reader-friendly feedback
- Semantic HTML structure
- Accessible form controls

### Interactive Challenges

Users identify accessibility problems in intentionally flawed interfaces.

Current challenges include:

1. **Color Contrast**
   - Identify insufficient color contrast between interface elements.

2. **Keyboard Navigation**
   - Identify an interactive element that cannot be reached using normal keyboard navigation.

3. **Form Labels**
   - Identify a form field that does not have a properly associated label.

### Scoring

- Server-side answer validation
- Session-based score tracking
- One point awarded per correctly completed challenge
- Duplicate submissions do not award additional points
- Final score and feedback displayed at the end
- Restart functionality

## Accessibility Features

Accessibility is a core requirement of this project rather than an additional feature.

The application demonstrates:

- Semantic HTML5 elements
- Proper heading structure
- Keyboard-accessible controls
- Visible `:focus-visible` indicators
- Programmatic focus management
- `aria-live` regions for dynamic feedback
- Properly associated form labels
- Fieldset and legend structures for grouped controls
- High contrast support
- Reduced motion support
- Adjustable text size
- Responsive layouts
- Screen-reader-friendly status updates
- Non-color-based feedback
- Accessible interactive controls

The project is designed with **WCAG principles** in mind and is being tested using keyboard navigation, browser zoom, screen readers, and accessibility auditing tools.

## Challenges

### Challenge 1: Color Contrast

The first challenge presents an intentionally low-contrast interface.

**Question:**

> What is the accessibility problem?

Users must identify the insufficient color contrast between the interface elements.

**Concept demonstrated:**
- Perceivable content
- Text contrast
- Visual accessibility

### Challenge 2: Keyboard Navigation

The second challenge contains an interactive control that cannot be reached using normal keyboard navigation.

**Question:**

> What is the accessibility problem?

Users must identify the keyboard accessibility issue.

**Concept demonstrated:**
- Keyboard accessibility
- Focus management
- Operable interfaces

### Challenge 3: Form Labels

The third challenge presents a form containing an improperly labeled email field.

**Question:**

> What is the accessibility problem?

Users must identify the missing programmatic association between the form field and its label.

**Concept demonstrated:**
- Accessible forms
- Programmatic relationships
- Screen reader usability
