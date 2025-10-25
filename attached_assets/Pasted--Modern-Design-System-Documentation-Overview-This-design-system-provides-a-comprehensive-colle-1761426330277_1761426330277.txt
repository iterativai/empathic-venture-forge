# Modern Design System Documentation

## Overview

This design system provides a comprehensive collection of modern, accessible UI components built with React, TypeScript, and Tailwind CSS. It features premium aesthetics, smooth animations, and exceptional user experience.

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Components](#components)
3. [Usage Examples](#usage-examples)
4. [Best Practices](#best-practices)
5. [Accessibility](#accessibility)

---

## Design Tokens

### CSS Variables

The design system uses CSS custom properties for consistent theming:

```css
/* Modern Design Tokens */
--spacing-unit: 0.25rem;
--transition-fast: 150ms;
--transition-base: 250ms;
--transition-slow: 350ms;
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-elastic: cubic-bezier(0.175, 0.885, 0.32, 1.275);

/* Enhanced Elevation System */
--elevation-1: 0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
--elevation-2: 0 4px 8px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.08);
--elevation-3: 0 8px 16px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.1);
--elevation-4: 0 16px 32px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.12);
--elevation-5: 0 24px 48px rgba(0, 0, 0, 0.12), 0 12px 24px rgba(0, 0, 0, 0.14);

/* Backdrop Blur Levels */
--blur-sm: 8px;
--blur-md: 12px;
--blur-lg: 16px;
--blur-xl: 24px;
```

### Utility Classes

#### Glass Morphism
- `.glass` - Basic glass effect with backdrop blur
- `.glass-panel` - Enhanced glass panel with elevation
- `.card-premium` - Premium card with gradient borders

#### Buttons
- `.btn-primary` - Primary action button with gradient
- `.btn-secondary` - Secondary button with glass effect

#### Loading States
- `.skeleton` - Animated skeleton loader
- `.skeleton-text` - Text placeholder
- `.skeleton-card` - Card placeholder
- `.skeleton-avatar` - Avatar placeholder

---

## Components

### ModernButton

A versatile button component with multiple variants and smooth animations.

#### Props

```typescript
interface ModernButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}
```

#### Usage

```tsx
import { ModernButton } from '@/components/ui/modern-button';
import { ArrowRight } from 'lucide-react';

// Primary button
<ModernButton variant="primary" size="lg">
  Get Started
</ModernButton>

// With icon
<ModernButton 
  variant="primary" 
  icon={<ArrowRight className="h-4 w-4" />}
  iconPosition="right"
>
  Continue
</ModernButton>

// Loading state
<ModernButton variant="primary" isLoading>
  Processing...
</ModernButton>

// Gradient variant
<ModernButton variant="gradient">
  Premium Action
</ModernButton>
```

#### Features
- ✨ Smooth hover animations
- 🎨 Multiple color variants
- ⚡ Built-in loading states
- 🎯 Icon support with positioning
- 📱 Responsive sizing
- ♿ Full accessibility support

---

### ModernCard

Premium card component with multiple design variants.

#### Props

```typescript
interface ModernCardProps {
  variant?: 'default' | 'premium' | 'glass' | 'elevated';
  hover?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

#### Usage

```tsx
import { 
  ModernCard, 
  ModernCardHeader, 
  ModernCardContent, 
  ModernCardFooter 
} from '@/components/ui/modern-card';

<ModernCard variant="premium" hover>
  <ModernCardHeader>
    <h3>Card Title</h3>
  </ModernCardHeader>
  <ModernCardContent>
    <p>Card content goes here</p>
  </ModernCardContent>
  <ModernCardFooter>
    <ModernButton>Action</ModernButton>
  </ModernCardFooter>
</ModernCard>
```

#### Variants
- **default**: Clean card with subtle border
- **premium**: Elevated design with gradient border effect
- **glass**: Glassmorphic with backdrop blur
- **elevated**: Strong shadow with prominent elevation

---

### ModernInput

Enhanced input component with floating labels and icon support.

#### Props

```typescript
interface ModernInputProps {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  floatingLabel?: boolean;
}
```

#### Usage

```tsx
import { ModernInput } from '@/components/ui/modern-input';
import { Mail, Search } from 'lucide-react';

// Standard input with label
<ModernInput
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  icon={<Mail className="h-4 w-4" />}
  hint="We'll never share your email"
/>

// Floating label variant
<ModernInput
  floatingLabel
  label="Search"
  type="text"
  icon={<Search className="h-4 w-4" />}
/>

// With error state
<ModernInput
  label="Email"
  type="email"
  value={email}
  error={error}
  onChange={handleChange}
/>
```

#### Features
- 🎯 Icon support on either side
- 🎨 Floating label animation
- ⚠️ Built-in error states
- 💡 Hint text support
- 🎭 Smooth focus transitions

---

### ModernBadge

Versatile badge component for status indicators and labels.

#### Props

```typescript
interface ModernBadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  pulse?: boolean;
}
```

#### Usage

```tsx
import { ModernBadge } from '@/components/ui/modern-badge';
import { Star, Check } from 'lucide-react';

// Status badges
<ModernBadge variant="success">Active</ModernBadge>
<ModernBadge variant="warning">Pending</ModernBadge>
<ModernBadge variant="error">Failed</ModernBadge>

// With icon
<ModernBadge variant="premium" icon={<Star className="h-3 w-3" />}>
  Pro
</ModernBadge>

// Live indicator with pulse
<ModernBadge variant="success" pulse>
  Live
</ModernBadge>
```

---

### ModernTooltip

Accessible tooltip component with customizable positioning.

#### Props

```typescript
interface ModernTooltipProps {
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}
```

#### Usage

```tsx
import { ModernTooltip } from '@/components/ui/modern-tooltip';

<ModernTooltip content="Helpful information" position="top">
  <ModernButton>Hover me</ModernButton>
</ModernTooltip>
```

---

### Skeleton Components

Loading state components for better perceived performance.

#### Usage

```tsx
import { 
  Skeleton, 
  SkeletonCard, 
  SkeletonAvatar, 
  SkeletonText,
  SkeletonTable 
} from '@/components/ui/modern-skeleton';

// Basic skeleton
<Skeleton className="h-12 w-full" />

// Predefined components
<SkeletonCard />
<SkeletonAvatar size="lg" />
<SkeletonText lines={3} />
<SkeletonTable rows={5} columns={4} />
```

---

## Usage Examples

### Complete Form Example

```tsx
import { ModernCard, ModernCardContent } from '@/components/ui/modern-card';
import { ModernInput } from '@/components/ui/modern-input';
import { ModernButton } from '@/components/ui/modern-button';
import { Mail, Lock } from 'lucide-react';

function LoginForm() {
  return (
    <ModernCard variant="premium" className="max-w-md mx-auto">
      <ModernCardContent className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>

        <div className="space-y-4">
          <ModernInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            icon={<Mail className="h-4 w-4" />}
          />
          
          <ModernInput
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={<Lock className="h-4 w-4" />}
          />
        </div>

        <ModernButton variant="primary" className="w-full" size="lg">
          Sign In
        </ModernButton>
      </ModernCardContent>
    </ModernCard>
  );
}
```

### Dashboard Card Example

```tsx
import { ModernCard, ModernCardHeader, ModernCardContent } from '@/components/ui/modern-card';
import { ModernBadge } from '@/components/ui/modern-badge';
import { TrendingUp } from 'lucide-react';

function MetricCard() {
  return (
    <ModernCard variant="premium" hover>
      <ModernCardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <ModernBadge 
            variant="success" 
            icon={<TrendingUp className="h-3 w-3" />}
          >
            +12%
          </ModernBadge>
        </div>
      </ModernCardHeader>
      <ModernCardContent>
        <p className="text-4xl font-bold">$24,500</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          vs last month
        </p>
      </ModernCardContent>
    </ModernCard>
  );
}
```

---

## Best Practices

### Component Usage

1. **Consistency**: Use the same variant throughout similar contexts
2. **Hierarchy**: Use size props to establish visual hierarchy
3. **Loading States**: Always provide loading states for async operations
4. **Accessibility**: Include proper ARIA labels and keyboard navigation

### Performance

1. **Lazy Loading**: Use React.lazy() for heavy components
2. **Memoization**: Wrap expensive renders with React.memo()
3. **Skeleton Screens**: Show skeleton loaders instead of spinners

### Theming

```tsx
// Use CSS variables for dynamic theming
<div style={{ 
  backgroundColor: 'var(--theme-primary)',
  color: 'var(--theme-text-primary)' 
}}>
  Themed content
</div>
```

---

## Accessibility

All components are built with accessibility in mind:

- ✅ Proper ARIA attributes
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ Color contrast compliance (WCAG AA)
- ✅ Reduced motion support

### Focus States

All interactive components have visible focus indicators:

```css
*:focus {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

### Reduced Motion

Respects user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Migration Guide

### From Old Components to New

```tsx
// Old button
<Button className="bg-blue-600">Click me</Button>

// New ModernButton
<ModernButton variant="primary">Click me</ModernButton>

// Old card
<Card className="shadow-lg">Content</Card>

// New ModernCard
<ModernCard variant="elevated">Content</ModernCard>
```

---

## Support

For questions or issues with the design system, please refer to:
- [Component Showcase](/design-showcase) - Live examples
- [GitHub Issues](https://github.com/your-repo/issues) - Report bugs
- [Documentation](https://docs.example.com) - Full API reference

---

**Built with ❤️ for modern web applications**

> **See Also**: [DESIGN_PRINCIPLES.md](./DESIGN_PRINCIPLES.md) - Core design principles that guide all decisions at IterativAnalytics

---

## Strategic Design Guidelines for IterativAnalytics

### Design System Philosophy

#### 1. African-First Design Approach

**Context Matters**
Design decisions must account for the African tech ecosystem:

- **Connectivity**: Assume intermittent, slow networks (3G/4G)
- **Devices**: Support older devices and smaller screens
- **Data Costs**: Minimize bandwidth usage
- **Offline Capability**: Core features must work offline
- **Local Context**: Support for multiple currencies, languages, and business practices

**Implementation:**
```tsx
// Optimize images
<LazyImage 
  src="/chart.webp" 
  lowQualitySrc="/chart-thumb.jpg"
  alt="Revenue chart"
/>

// Offline-first data
const { data } = useQuery({
  queryKey: ['metrics'],
  queryFn: fetchMetrics,
  staleTime: 5 * 60 * 1000, // 5 min cache
  cacheTime: 30 * 60 * 1000, // 30 min offline
});
```

#### 2. Progressive Enhancement Strategy

Build features in layers:

**Layer 1: Core Experience** (All Users)
- Essential functionality
- Works without JavaScript
- Basic HTML/CSS
- Accessible to all

**Layer 2: Enhanced Experience** (Modern Browsers)
- JavaScript enhancements
- Smooth animations
- Interactive components
- Improved UX

**Layer 3: Advanced Features** (High-End Devices)
- Advanced visualizations
- Real-time updates
- Complex interactions
- Premium effects

**Example:**
```tsx
// Core: Static chart image fallback
<noscript>
  <img src="/static-chart.png" alt="Revenue trend" />
</noscript>

// Enhanced: Interactive chart
{isClient && (
  <InteractiveChart data={data} />
)}

// Advanced: Real-time updates
{supportsWebSocket && (
  <RealtimeChart stream={dataStream} />
)}
```

#### 3. Data Visualization Philosophy

**Tell Stories, Not Just Numbers**

Transform raw data into actionable insights:

1. **Start with the Insight**: Lead with what matters
2. **Provide Context**: Compare against benchmarks, trends
3. **Guide Action**: What should the user do?
4. **Simplify Complexity**: Progressive disclosure of details

**Bad Example:**
```tsx
<Card>
  <h3>Revenue</h3>
  <p>$124,500</p>
</Card>
```

**Good Example:**
```tsx
<MetricCard
  title="Monthly Revenue"
  value="$124,500"
  change="+12.5%"
  trend="up"
  insight="Best month this quarter"
  action="View breakdown"
  comparison={{
    label: "vs. last month",
    value: "+$13,800"
  }}
  sparkline={monthlyData}
/>
```

#### 4. Performance Budget

Maintain strict performance standards:

**Target Metrics:**
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

**Bundle Size Limits:**
- Initial JS: < 200KB (gzipped)
- Initial CSS: < 50KB (gzipped)
- Images: WebP format, lazy loaded
- Fonts: Subset, preloaded

**Monitoring:**
```bash
# Run Lighthouse CI
npm run lighthouse

# Check bundle size
npm run analyze
```

---

## Component Development Patterns

### Component Checklist

Every component must meet these standards before merging:

#### Functionality
- [ ] Implements specified behavior correctly
- [ ] Handles edge cases gracefully
- [ ] Provides appropriate error states
- [ ] Includes loading states
- [ ] Works without JavaScript (progressive enhancement)

#### Accessibility
- [ ] Keyboard navigable (Tab, Enter, Space, Escape)
- [ ] Screen reader friendly (ARIA labels, roles)
- [ ] Focus visible and logical
- [ ] Touch targets ≥ 44x44px
- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Respects prefers-reduced-motion

#### Performance
- [ ] Code split if > 20KB
- [ ] Lazy loaded where appropriate
- [ ] No unnecessary re-renders
- [ ] Optimized images (WebP, lazy)
- [ ] Uses React.memo() when appropriate

#### Responsive Design
- [ ] Mobile-first implementation
- [ ] Works on 320px width
- [ ] Adapts to tablet (768px+)
- [ ] Optimized for desktop (1024px+)
- [ ] Touch-friendly on mobile

#### Code Quality
- [ ] TypeScript with strict types
- [ ] Follows naming conventions
- [ ] Well-documented (JSDoc)
- [ ] No console logs or TODOs
- [ ] Linted and formatted

#### Testing
- [ ] Unit tests for logic
- [ ] Integration tests for interactions
- [ ] Accessibility tests (jest-axe)
- [ ] Visual regression tests (if applicable)

### Component Template

Use this template for new components:

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

/**
 * ComponentName - Brief description
 * 
 * @example
 * <ComponentName variant="primary" size="lg">
 *   Content
 * </ComponentName>
 */

interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variant style */
  variant?: 'default' | 'primary' | 'secondary';
  /** Size option */
  size?: 'sm' | 'md' | 'lg';
  /** Additional content */
  children: React.ReactNode;
}

export const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ 
  variant = 'default', 
  size = 'md', 
  className,
  children,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // Base styles
        "rounded-lg transition-all",
        // Variant styles
        {
          'bg-white': variant === 'default',
          'bg-primary text-white': variant === 'primary',
          'bg-secondary': variant === 'secondary',
        },
        // Size styles
        {
          'p-2 text-sm': size === 'sm',
          'p-4 text-base': size === 'md',
          'p-6 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

ComponentName.displayName = 'ComponentName';
```

### Naming Conventions

**Components:**
- PascalCase: `UserProfileCard`, `MetricDisplay`
- Descriptive and specific
- Prefix with domain: `DashboardMetricCard`

**Props:**
- camelCase: `isLoading`, `onClick`, `userName`
- Boolean props: `is*`, `has*`, `should*`
- Handlers: `on*` (onClick, onSubmit)

**CSS Classes:**
- kebab-case: `metric-card`, `user-profile`
- BEM for complex components: `card__header`, `card--premium`
- Utility-first with Tailwind

**Files:**
- Components: `ComponentName.tsx`
- Hooks: `useHookName.ts`
- Utils: `functionName.ts`
- Types: `types.ts` or `ComponentName.types.ts`

---

## Design Tokens in Practice

### Using CSS Variables

**Define in CSS:**
```css
:root {
  --color-primary: #0A84FF;
  --spacing-4: 1rem;
  --radius-md: 0.5rem;
  --elevation-2: 0 4px 8px rgba(0, 0, 0, 0.06);
}
```

**Use in Components:**
```tsx
// ✅ Good - Use design tokens
<div className="rounded-md shadow-elevation-2 p-4">
  Content
</div>

// ✅ Good - Custom component with tokens
<div style={{ 
  borderRadius: 'var(--radius-md)',
  padding: 'var(--spacing-4)' 
}}>
  Content
</div>

// ❌ Bad - Arbitrary values
<div className="rounded-[7px] shadow-[0_3px_7px_rgba(0,0,0,0.05)] p-[15px]">
  Content
</div>
```

### Dynamic Theming

Support sector-based themes:

```tsx
// Theme provider
const ThemeContext = React.createContext({
  sector: 'fintech',
  colors: {
    primary: '#0A84FF',
    secondary: '#059669',
  }
});

// Component using theme
function MetricCard() {
  const { colors } = useTheme();
  
  return (
    <div 
      className="theme-card"
      style={{ 
        '--theme-primary': colors.primary,
        '--theme-secondary': colors.secondary 
      } as React.CSSProperties}
    >
      <div className="theme-bg-primary">
        Content
      </div>
    </div>
  );
}
```

---

## Accessibility Standards

### Semantic HTML First

Always use appropriate HTML elements:

```tsx
// ✅ Good - Semantic HTML
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/dashboard">Dashboard</a></li>
    <li><a href="/analytics">Analytics</a></li>
  </ul>
</nav>

// ❌ Bad - Div soup
<div className="nav">
  <div className="nav-item" onClick={() => navigate('/dashboard')}>
    Dashboard
  </div>
</div>
```

### ARIA Patterns

Use ARIA appropriately:

**Button:**
```tsx
<button
  aria-label="Close modal"
  aria-pressed={isPressed}
  aria-disabled={isDisabled}
>
  <X aria-hidden="true" />
</button>
```

**Modal:**
```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Confirm Action</h2>
  <p id="modal-description">Are you sure?</p>
</div>
```

**Live Region:**
```tsx
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {successMessage}
</div>
```

### Focus Management

```tsx
function Modal({ isOpen, onClose }) {
  const firstFocusRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store previous focus
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus first element
      firstFocusRef.current?.focus();
    } else {
      // Restore focus
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <button ref={firstFocusRef} onClick={onClose}>
        Close
      </button>
      {/* Modal content */}
    </Dialog>
  );
}
```

---

## Responsive Design Patterns

### Mobile-First Breakpoints

```tsx
// Tailwind breakpoints
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Extra large
};

// Usage
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4 
  md:gap-6
">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Responsive Component Pattern

```tsx
function ResponsiveMetrics() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1023px)');
  
  if (isMobile) {
    return <MobileMetricsView />;
  }
  
  if (isTablet) {
    return <TabletMetricsView />;
  }
  
  return <DesktopMetricsView />;
}
```

### Responsive Tables

```tsx
function DataTable({ data }) {
  return (
    <>
      {/* Desktop: Full table */}
      <div className="hidden lg:block">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Revenue</th>
              <th>Growth</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.revenue}</td>
                <td>{row.growth}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile: Card layout */}
      <div className="lg:hidden space-y-4">
        {data.map(row => (
          <Card key={row.id}>
            <div className="font-semibold">{row.name}</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <span className="text-sm text-gray-600">Revenue</span>
                <div>{row.revenue}</div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Growth</span>
                <div>{row.growth}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
```

---

## Quality Assurance Process

### Pre-Commit Checklist

Before committing code:

1. **Run Linter**: `npm run lint`
2. **Type Check**: `npm run check`
3. **Format Code**: `npm run format`
4. **Run Tests**: `npm test`
5. **Check Bundle Size**: Verify no significant increase
6. **Test Manually**: Check in browser

### Code Review Standards

Reviewers should verify:

#### Design Adherence
- [ ] Follows design system guidelines
- [ ] Uses existing components where possible
- [ ] Consistent spacing (4px base unit)
- [ ] Proper color usage (semantic tokens)
- [ ] Appropriate typography scale

#### Code Quality
- [ ] TypeScript types are strict and accurate
- [ ] No `any` types without justification
- [ ] Proper error handling
- [ ] No console logs or debugger statements
- [ ] Functions are small and focused (< 50 lines)

#### Performance
- [ ] No unnecessary re-renders
- [ ] Images are optimized
- [ ] Code is split appropriately
- [ ] No blocking operations
- [ ] Efficient algorithms

#### Accessibility
- [ ] Keyboard navigable
- [ ] Proper ARIA attributes
- [ ] Screen reader tested
- [ ] Color contrast verified
- [ ] Focus states visible

### Testing Strategy

**Unit Tests** - Test isolated logic
```tsx
describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
  });
  
  it('handles zero', () => {
    expect(formatCurrency(0, 'USD')).toBe('$0.00');
  });
});
```

**Integration Tests** - Test component interactions
```tsx
describe('MetricCard', () => {
  it('displays metric with change indicator', () => {
    render(<MetricCard value="$1000" change="+10%" />);
    expect(screen.getByText('$1000')).toBeInTheDocument();
    expect(screen.getByText('+10%')).toBeInTheDocument();
  });
  
  it('shows trend icon based on direction', () => {
    const { rerender } = render(
      <MetricCard value="$1000" trend="up" />
    );
    expect(screen.getByLabelText('Trending up')).toBeInTheDocument();
    
    rerender(<MetricCard value="$1000" trend="down" />);
    expect(screen.getByLabelText('Trending down')).toBeInTheDocument();
  });
});
```

**Accessibility Tests**
```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<MetricCard value="$1000" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Future Development Guidelines

### Adding New Components

1. **Check Existing Components**: Can you compose from existing?
2. **Design First**: Create mockups and get approval
3. **Build Accessible**: Follow WCAG 2.1 AA from start
4. **Document**: Add to design system docs
5. **Test Thoroughly**: Unit, integration, accessibility tests
6. **Get Review**: 2+ approvals before merge

### Deprecating Components

When replacing old components:

1. **Mark as Deprecated**: Add warning in code
2. **Document Migration**: Provide clear upgrade path
3. **Give Notice**: Announce deprecation timeline
4. **Provide Codemods**: Automate migration if possible
5. **Remove Gradually**: Remove after 2+ releases

### Contributing to Design System

**Small Changes** (Bug fixes, minor improvements)
- Create PR with clear description
- Include before/after screenshots
- Get 1 approval

**Medium Changes** (New variants, features)
- Open discussion issue first
- Get design approval
- Create PR with documentation
- Get 2 approvals

**Large Changes** (New components, patterns)
- RFC (Request for Comments) document
- Design review meeting
- Prototype/proof of concept
- Comprehensive documentation
- Get 3+ approvals

---

## Design System Governance

### Roles & Responsibilities

**Design System Team**
- Maintain component library
- Review design proposals
- Update documentation
- Ensure consistency

**Contributors**
- Follow guidelines
- Propose improvements
- Report issues
- Share feedback

**Stakeholders**
- Provide requirements
- Review major changes
- Approve breaking changes

### Decision-Making Process

**Minor Decisions** (Bug fixes, small improvements)
- Design system team decides
- Fast iteration

**Major Decisions** (New patterns, breaking changes)
- RFC document
- Team discussion
- Stakeholder review
- Consensus required

### Versioning

Follow semantic versioning:

- **Patch** (1.0.x): Bug fixes, documentation
- **Minor** (1.x.0): New features, backward compatible
- **Major** (x.0.0): Breaking changes

---

## Resources & References

### Internal Documentation
- [Design Principles](./DESIGN_PRINCIPLES.md) - Core design principles
- [Design System Quick Reference](./DESIGN_SYSTEM_QUICKREF.md) - Quick reference guide
- [Architecture Guide](./ARCHITECTURE.md) - System architecture
- [Implementation Guide](./Implementation_Guide.md) - Development setup
- [README](./README.md) - Project overview

### Design Tools
- Tailwind CSS: `tailwind.config.ts`
- shadcn/ui components: `components.json`
- Theme configuration: `theme.json`

### External Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Components](https://inclusive-components.design/)
- [Web.dev Accessibility](https://web.dev/accessibility/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Design Inspiration
- [Apple Human Interface Guidelines](https://developer.apple.com/design/)
- [Material Design](https://material.io/design)
- [Atlassian Design System](https://atlassian.design/)

---

## Conclusion

This design system is a living document that evolves with IterativAnalytics. It provides:

✅ **Consistency** - Unified experience across all features  
✅ **Efficiency** - Faster development with reusable components  
✅ **Quality** - High standards maintained automatically  
✅ **Accessibility** - Inclusive by default  
✅ **Performance** - Optimized for African connectivity  

### Next Steps

1. **Familiarize** yourself with this documentation
2. **Use** existing components before creating new ones
3. **Contribute** improvements and report issues
4. **Maintain** consistency in all new development
5. **Iterate** - Help evolve this system

### Questions or Feedback?

- Open an issue for bugs or suggestions
- Start a discussion for design proposals
- Contact the design system team for guidance

---

**Version 1.0** | Last Updated: October 2025  
**Built with ❤️ for African innovation**
