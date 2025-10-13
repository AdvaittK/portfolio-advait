# Contributing to Portfolio Advait

First off, thank you for considering contributing to this portfolio project! 🎉

The following is a set of guidelines for contributing. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Pull Requests](#pull-requests)
- [Styleguides](#styleguides)
  - [Git Commit Messages](#git-commit-messages)
  - [TypeScript Styleguide](#typescript-styleguide)
  - [Component Guidelines](#component-guidelines)
- [Development Process](#development-process)

## 🤝 Code of Conduct

This project and everyone participating in it is governed by respect, professionalism, and inclusivity. By participating, you are expected to uphold these values.

## 🎯 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you are creating a bug report, please include as many details as possible:

**Bug Report Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. Windows, macOS, Linux]
 - Browser: [e.g. Chrome, Safari, Firefox]
 - Version: [e.g. 22]
 - Device: [e.g. Desktop, iPhone 12]

**Additional context**
Add any other context about the problem here.
```

### ✨ Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

**Enhancement Template:**

```markdown
**Is your feature request related to a problem?**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.

**Implementation ideas**
If you have ideas on how to implement this, please share!
```

### 🚀 Your First Code Contribution

Unsure where to begin? You can start by looking through `good-first-issue` and `help-wanted` issues.

#### Local Development Setup

1. **Fork the repository** and clone your fork:
   ```bash
   git clone https://github.com/your-username/portfolio-advait.git
   cd portfolio-advait
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Create a branch:**
   ```bash
   git checkout -b feature/my-new-feature
   ```

4. **Start development server:**
   ```bash
   pnpm dev
   ```

5. **Make your changes** and test thoroughly

6. **Commit your changes:**
   ```bash
   git commit -m 'Add some feature'
   ```

7. **Push to your fork:**
   ```bash
   git push origin feature/my-new-feature
   ```

8. **Open a Pull Request**

### 🔀 Pull Requests

The process described here has several goals:
- Maintain code quality
- Fix problems that are important to users
- Engage the community in working toward the best possible portfolio
- Enable a sustainable system for maintainers to review contributions

**Pull Request Process:**

1. **Update the README.md** with details of changes if applicable
2. **Follow the styleguides** outlined below
3. **Test your changes** across different browsers and devices
4. **Ensure the build passes** (`pnpm build`)
5. **Update documentation** if you're changing functionality
6. **Request review** from maintainers

**Pull Request Template:**

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran to verify your changes

## Checklist:
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested this on multiple browsers
- [ ] I have checked responsive design on mobile devices

## Screenshots (if applicable):
Add screenshots to demonstrate the changes
```

## 📝 Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * ⚡ `:zap:` when improving performance
    * 🐛 `:bug:` when fixing a bug
    * ✨ `:sparkles:` when adding a new feature
    * 📝 `:memo:` when writing docs
    * 🚀 `:rocket:` when deploying
    * 💄 `:lipstick:` when updating the UI and style files
    * ♿ `:wheelchair:` when improving accessibility
    * 🔧 `:wrench:` when updating configuration files
    * 🚨 `:rotating_light:` when removing linter warnings
    * ✅ `:white_check_mark:` when adding tests
    * 🔒 `:lock:` when dealing with security

**Examples:**
```
✨ Add dark mode toggle to header
🐛 Fix carousel navigation on mobile
📝 Update installation instructions in README
⚡ Optimize image loading with lazy loading
```

### TypeScript Styleguide

* Use TypeScript for all new code
* Define proper types, avoid `any`
* Use interfaces for object shapes
* Use type aliases for unions and complex types
* Export types that might be reused

**Example:**
```typescript
// Good
interface ProjectData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

const project: ProjectData = {
  // ...
};

// Avoid
const project: any = {
  // ...
};
```

### Component Guidelines

#### File Structure
```typescript
// 1. Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

// 3. Component
export function MyComponent({ title, onClick }: MyComponentProps) {
  // 3a. Hooks
  const [state, setState] = useState(false);
  
  // 3b. Handlers
  const handleClick = () => {
    onClick?.();
  };
  
  // 3c. Render
  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}
```

#### Best Practices

* **Component Naming**: Use PascalCase for components
* **Props**: Destructure props in function parameters
* **Event Handlers**: Prefix with `handle` (e.g., `handleClick`)
* **Server Components**: Default to Server Components, use `"use client"` only when needed
* **Accessibility**: Include ARIA labels and keyboard navigation
* **Responsive**: Test on mobile, tablet, and desktop
* **Performance**: Use `React.memo()` for expensive renders

#### Component Checklist
- [ ] TypeScript types defined
- [ ] Responsive on all screen sizes
- [ ] Accessible (keyboard navigation, ARIA labels)
- [ ] Follows naming conventions
- [ ] Comments for complex logic
- [ ] No console.logs in production code
- [ ] Handles loading and error states

### CSS/Tailwind Guidelines

* Use Tailwind utility classes instead of custom CSS when possible
* For complex styles, use `@apply` in CSS modules
* Follow mobile-first responsive design
* Use semantic color names from theme
* Maintain consistent spacing scale

**Example:**
```typescript
// Good
<div className="flex flex-col gap-4 md:flex-row md:gap-8">
  <Card className="p-6 hover:shadow-lg transition-shadow">
    {/* content */}
  </Card>
</div>

// Avoid inline styles
<div style={{ display: 'flex', gap: '16px' }}>
  {/* content */}
</div>
```

## 🔄 Development Process

### Branch Naming Convention
* `feature/` - New features
* `fix/` - Bug fixes
* `docs/` - Documentation changes
* `refactor/` - Code refactoring
* `style/` - Style changes
* `test/` - Adding or updating tests

**Examples:**
```
feature/add-project-filter
fix/mobile-navigation-bug
docs/update-contributing-guide
refactor/optimize-image-loading
```

### Testing Checklist

Before submitting a PR, verify:

- [ ] **Build Success**: `pnpm build` completes without errors
- [ ] **Linting**: `pnpm lint` passes
- [ ] **Browser Testing**: Tested on Chrome, Firefox, Safari
- [ ] **Mobile Testing**: Tested on iOS and Android
- [ ] **Responsive Design**: Works on mobile, tablet, desktop
- [ ] **Dark/Light Mode**: Works in both themes
- [ ] **Accessibility**: Screen reader compatible
- [ ] **Performance**: No significant performance degradation

### Code Review Process

1. **Automated Checks**: CI/CD pipeline runs automatically
2. **Maintainer Review**: A maintainer will review your PR
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged
5. **Celebration**: You're now a contributor! 🎉

## 🏆 Recognition

Contributors will be recognized in the following ways:
* Listed in the project's contributors
* Mentioned in release notes for significant contributions
* Credit in the README for major features

## 📚 Additional Resources

* [Next.js Documentation](https://nextjs.org/docs)
* [React Documentation](https://react.dev)
* [TypeScript Handbook](https://www.typescriptlang.org/docs/)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## ❓ Questions?

Feel free to:
* Open an issue with the `question` label
* Reach out via email: advaitt.dev@gmail.com
* Check existing issues and discussions

---

<div align="center">

**Thank you for contributing! 🚀**

*Together we build better experiences*

</div>

