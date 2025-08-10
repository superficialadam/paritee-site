# Paritee V4 Style Guide

## Overview

Version 4 is a complete visual redesign that maintains only the P5.js particle background system and base typography from V3B. This version explores sophisticated color relationships, refined typography hierarchy, and interaction patterns inspired by industry-leading design agencies.

## Foundation (Minimal V3B Inheritance)

### Background System
- **P5.js Particle Canvas**: Dynamic particle network with scroll-responsive movement
- **Base Color**: Dark blue (#0E2756) as canvas background
- **Particle Behavior**: Enhanced particle system with new color relationships
- **Scroll Integration**: Particle movement responds to page scroll offset

### Typography Foundation
- **Font Stack**: Base fonts only (font-heading and body text)
- **All Other Typography**: Completely redesigned scales, weights, and hierarchy
- **Color Exploration**: Moving beyond pure white text for sophisticated color relationships

## Brand Integration

### Paritee Logo Implementation
The Paritee logo (minimal white text on transparent background) becomes a key design element:

```tsx
import Image from 'next/image';

const LogoComponent = ({ size = 'medium', variant = 'light' }) => {
  const sizes = {
    small: 'w-24 h-12',
    medium: 'w-32 h-16', 
    large: 'w-48 h-24',
    hero: 'w-64 h-32'
  };
  
  return (
    <div className={`${sizes[size]} relative`}>
      <Image
        src="/images/logo.png"
        alt="Paritee"
        fill
        className={`object-contain ${
          variant === 'light' ? 'invert-0' : 
          variant === 'dark' ? 'invert' : 
          'opacity-80'
        }`}
        priority
      />
    </div>
  );
};
```

## Color System (Fresh Design Direction)

### Sophisticated Color Palette
Moving beyond pure white on dark blue to create depth and sophistication:

```css
:root {
  /* Base background from V3B */
  --bg-canvas: #0E2756;
  
  /* New primary colors */
  --cream: #F5F1EB;
  --warm-gray: #8B8680;
  --charcoal: #2C2A26;
  --sage: #9CAE8A;
  --soft-blue: #7A9CC6;
  
  /* Accent colors */
  --gold: #D4B886;
  --coral: #E8A598;
  --lavender: #B5A7C7;
}
```

### Color Usage Strategy
- **Primary Text**: Cream (#F5F1EB) for maximum elegance
- **Secondary Text**: Warm Gray (#8B8680) for hierarchy
- **Accent Elements**: Sage green for CTAs and highlights
- **Particle Colors**: Soft blue variations that complement the background
- **Logo**: Maintains white/cream appearance for brand consistency

## Typography Hierarchy (Complete Redesign)

### Scale & Weight System
```css
/* Completely new typography scale */
.text-display {
  font-size: clamp(4rem, 12vw, 8rem);
  font-weight: 200;
  line-height: 0.9;
  letter-spacing: -0.02em;
}

.text-hero {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.text-heading {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 400;
  line-height: 1.2;
}

.text-subheading {
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 500;
  line-height: 1.3;
}

.text-body-large {
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.6;
}

.text-body {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.65;
}

.text-caption {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.025em;
}
```

### Typography Color Applications
```tsx
const TypographyShowcase = () => (
  <div className="space-y-8">
    <h1 className="text-display text-cream">Paritee</h1>
    <h2 className="text-hero text-warm-gray">Creative Networks</h2>
    <h3 className="text-heading text-sage">Section Heading</h3>
    <p className="text-body text-warm-gray">
      Body text uses warm gray for comfortable reading while maintaining 
      sufficient contrast against the dark blue background.
    </p>
    <span className="text-caption text-gold uppercase tracking-wider">
      Accent Text
    </span>
  </div>
);
```

## Section Architecture (Team Farner Inspired)

### Full Viewport Sections with Refined Styling
```css
.section-container {
  min-height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  align-items: center;
  padding: 6rem 3rem;
  position: relative;
}

.page-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
  scroll-behavior: smooth;
}

/* Section variants */
.section-light {
  background: linear-gradient(135deg, rgba(245,241,235,0.03) 0%, rgba(156,174,138,0.02) 100%);
}

.section-emphasis {
  background: linear-gradient(135deg, rgba(122,156,198,0.05) 0%, rgba(212,184,134,0.03) 100%);
}
```

### Progressive Disclosure (Minimalist Approach)
```tsx
const MinimalExpandableSection = ({ section }: { section: ExpandableSection }) => (
  <motion.div
    className="py-12 border-b border-cream/10"
    layout
  >
    <div className="max-w-4xl">
      <h3 className="text-heading text-cream mb-6">{section.title}</h3>
      <p className="text-body text-warm-gray mb-8 leading-relaxed">
        {section.preview}
      </p>
      
      <AnimatePresence>
        {section.isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="text-body text-warm-gray space-y-4">
              {section.fullContent.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        className="text-sage hover:text-gold transition-colors duration-300 flex items-center space-x-2 mt-6"
        onClick={() => toggleExpansion(section.id)}
      >
        <span className="text-caption font-medium tracking-wide">
          {section.isExpanded ? 'Read Less' : 'Read More'}
        </span>
        <motion.span
          animate={{ rotate: section.isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ↓
        </motion.span>
      </button>
    </div>
  </motion.div>
);
```

## Animation & Interaction Patterns

### Smooth Scroll Flow (Noomo Inspired)
Enhanced scroll experience with momentum and easing:

```tsx
// Custom hook for smooth scroll behavior
const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
};
```

### Animated Testimonials Carousel (Noomo Style)
Horizontal scroll testimonials with smooth transitions:

```tsx
const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  return (
    <div className="overflow-hidden">
      <motion.div 
        className="flex"
        animate={{ x: -currentIndex * 100 + "%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="min-w-full p-12 text-center"
            initial={{ opacity: 0.3 }}
            animate={{ 
              opacity: index === currentIndex ? 1 : 0.3,
              scale: index === currentIndex ? 1 : 0.95
            }}
          >
            <blockquote className="text-2xl text-white font-light mb-6">
              "{testimonial.quote}"
            </blockquote>
            <cite className="text-white/60">— {testimonial.author}</cite>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
```

### Subtle 3D Typography (Noomo Style)
CSS-based text depth without full 3D complexity:

```css
.text-3d-subtle {
  text-shadow: 
    1px 1px 0 rgba(255,255,255,0.1),
    2px 2px 0 rgba(255,255,255,0.05),
    3px 3px 0 rgba(255,255,255,0.025);
  transform: perspective(500px) rotateX(5deg);
  transform-origin: center bottom;
}

.text-3d-hover:hover {
  transform: perspective(500px) rotateX(0deg) translateZ(10px);
  transition: transform 0.3s ease;
}
```

### Navigation with Logo Integration
Refined timing and sophisticated color treatment:

```tsx
const NavigationV4 = () => (
  <motion.nav
    className="fixed top-0 w-full z-50"
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.6, delay: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
  >
    <div className="backdrop-blur-xl bg-charcoal/10 border-b border-cream/5">
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <LogoComponent size="small" variant="light" />
        </motion.div>
        
        <div className="flex space-x-10">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="text-warm-gray hover:text-sage transition-colors duration-300 text-caption font-medium tracking-wide"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.4 + index * 0.1,
                ease: "easeOut"
              }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  </motion.nav>
);
```

## Layout Patterns

### Clean Full-Width Toggles (RGA Inspired)
Sophisticated accordion sections with refined color treatment:

```tsx
const FullWidthToggleSection = ({ title, children, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  return (
    <motion.section 
      className="w-full border-b border-cream/5"
      layout
    >
      <button
        className="w-full p-16 text-left hover:bg-sage/5 transition-colors duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h2 className="text-hero text-cream font-light">{title}</h2>
          <motion.div
            className="w-12 h-12 rounded-full border border-warm-gray flex items-center justify-center"
            animate={{ 
              rotate: isExpanded ? 45 : 0,
              borderColor: isExpanded ? 'var(--sage)' : 'var(--warm-gray)'
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-warm-gray text-xl">+</span>
          </motion.div>
        </div>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-16 pb-16 max-w-7xl mx-auto">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
```

### Section Carousels (Pentagram Inspired)
Elegant horizontal scrolling with sophisticated styling:

```tsx
const SectionCarousel = ({ items, title }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 420;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="py-20">
      <div className="flex justify-between items-center mb-12 max-w-7xl mx-auto px-8">
        <h3 className="text-heading text-cream">{title}</h3>
        <div className="flex space-x-3">
          <motion.button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border border-warm-gray text-warm-gray hover:border-sage hover:text-sage transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ←
          </motion.button>
          <motion.button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border border-warm-gray text-warm-gray hover:border-sage hover:text-sage transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            →
          </motion.button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth space-x-6 px-8 pb-6 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => (
          <motion.article
            key={index}
            className="min-w-[350px] p-8 border-l border-cream/10 hover:border-sage/30 transition-colors duration-300"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4">
              <h4 className="text-subheading text-cream">{item.title}</h4>
              <p className="text-body text-warm-gray leading-relaxed">{item.description}</p>
              <div className="pt-2">
                <span className="text-caption text-sage uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};
```

## Button System (Sophisticated Color Approach)

### Enhanced Button Components
Refined buttons with sophisticated color relationships:

```tsx
const ButtonV4 = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  ...props 
}) => {
  const baseClasses = "relative overflow-hidden transition-all duration-300 rounded-sm";
  const variants = {
    primary: "bg-sage text-charcoal hover:bg-gold hover:text-charcoal border border-sage hover:border-gold",
    secondary: "bg-transparent text-sage border border-sage hover:bg-sage/10 hover:text-cream",
    tertiary: "bg-transparent text-warm-gray border border-warm-gray hover:bg-warm-gray/10 hover:text-cream hover:border-cream",
    ghost: "text-sage hover:text-gold underline-offset-4 hover:underline"
  };
  const sizes = {
    small: "px-5 py-2 text-caption font-medium tracking-wide",
    medium: "px-8 py-3 text-body font-medium",
    large: "px-12 py-4 text-body-large font-medium"
  };
  
  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Subtle shimmer effect */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/10 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.button>
  );
};
```

### CTA Link Components
Minimal link styling with elegant interactions:

```tsx
const LinkV4 = ({ children, href, variant = 'default' }) => {
  const variants = {
    default: "text-sage hover:text-gold",
    subtle: "text-warm-gray hover:text-cream",
    emphasis: "text-cream hover:text-gold"
  };
  
  return (
    <motion.a
      href={href}
      className={`${variants[variant]} transition-colors duration-300 inline-flex items-center space-x-2 text-caption font-medium tracking-wide`}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <span>{children}</span>
      <motion.span
        className="text-sm"
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
      >
        →
      </motion.span>
    </motion.a>
  );
};
```

## Footer Design (Sophisticated & Refined)

### Elegant Contact Footer
Clean hierarchy with sophisticated color relationships:

```tsx
const FooterV4 = () => (
  <footer className="border-t border-cream/5 bg-charcoal/5">
    <div className="max-w-7xl mx-auto px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-16">
        {/* Brand Section */}
        <div className="md:col-span-2">
          <div className="mb-8">
            <LogoComponent size="large" variant="light" />
          </div>
          <p className="text-body text-warm-gray mb-8 leading-relaxed max-w-md">
            Connecting brands with the right creative partners through curated networks and strategic matching.
          </p>
          <div className="flex space-x-6">
            <LinkV4 href="#" variant="subtle">Twitter</LinkV4>
            <LinkV4 href="#" variant="subtle">LinkedIn</LinkV4>
            <LinkV4 href="#" variant="subtle">Instagram</LinkV4>
          </div>
        </div>
        
        {/* News Section */}
        <div>
          <h4 className="text-subheading text-cream mb-8">Recent News</h4>
          <div className="space-y-6">
            {latestNews.slice(0, 3).map((item, index) => (
              <article key={index}>
                <div className="text-caption text-gold uppercase tracking-wider mb-2">{item.date}</div>
                <LinkV4 href="#" variant="emphasis" className="text-body">
                  {item.title}
                </LinkV4>
              </article>
            ))}
          </div>
        </div>
        
        {/* About Section */}
        <div>
          <h4 className="text-subheading text-cream mb-8">Company</h4>
          <nav className="space-y-4">
            <LinkV4 href="#" variant="default">Our Mission</LinkV4>
            <LinkV4 href="#" variant="default">Leadership Team</LinkV4>
            <LinkV4 href="#" variant="default">Careers</LinkV4>
            <LinkV4 href="#" variant="default">Partner Network</LinkV4>
            <LinkV4 href="#" variant="default">Case Studies</LinkV4>
          </nav>
        </div>
        
        {/* Contact Section */}
        <div>
          <h4 className="text-subheading text-cream mb-8">Contact</h4>
          <div className="space-y-4">
            <div>
              <div className="text-caption text-gold uppercase tracking-wider mb-2">Email</div>
              <LinkV4 href="mailto:hello@paritee.com" variant="emphasis">
                hello@paritee.com
              </LinkV4>
            </div>
            <div>
              <div className="text-caption text-gold uppercase tracking-wider mb-2">Phone</div>
              <LinkV4 href="tel:+1555123456" variant="emphasis">
                +1 (555) 123-4567
              </LinkV4>
            </div>
            <div>
              <div className="text-caption text-gold uppercase tracking-wider mb-2">Locations</div>
              <div className="space-y-1 text-body text-warm-gray">
                <div>New York</div>
                <div>London</div>
                <div>Tokyo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-cream/5 mt-16 pt-8 flex justify-between items-center">
        <div className="text-caption text-warm-gray">
          © {new Date().getFullYear()} Paritee. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <LinkV4 href="#" variant="subtle">Privacy Policy</LinkV4>
          <LinkV4 href="#" variant="subtle">Terms of Service</LinkV4>
        </div>
      </div>
    </div>
  </footer>
);
```

## Scroll Behavior Configuration

### CSS Scroll Snap Setup
```css
/* Apply to main page container */
.v4-page-container {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  height: 100vh;
}

/* Apply to major sections */
.v4-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Disable scroll snap on mobile for better UX */
@media (max-width: 768px) {
  .v4-page-container {
    scroll-snap-type: none;
  }
  
  .v4-section {
    min-height: auto;
    scroll-snap-align: none;
  }
}
```

## Implementation Priority

### Phase 1: Core Structure
1. Implement scroll snap behavior
2. Create expandable section components
3. Set up smooth scroll library integration

### Phase 2: Interactive Elements
1. Build animated testimonial carousel
2. Implement section carousels
3. Create enhanced button system

### Phase 3: Refinements
1. Add subtle 3D typography effects
2. Implement navigation timing improvements
3. Build clean footer layout

### Phase 4: Performance & Polish
1. Optimize P5.js background performance
2. Add loading states and micro-interactions
3. Mobile responsive adjustments

## Technical Requirements

### Dependencies
```json
{
  "@studio-freight/lenis": "^1.0.0", // Smooth scroll
  "framer-motion": "^10.0.0", // Animations
  "p5": "^1.7.0" // Background particles (existing)
}
```

### Key Files to Modify/Create
- `src/app/(prototypes)/v4/` - New V4 prototype directory
- `src/components/v4/` - V4-specific components
- `src/lib/scroll.ts` - Smooth scroll utilities
- `src/hooks/useScrollSnap.ts` - Scroll snap hook

## Enhanced Particle System

### P5.js Background Updates
```javascript
// Enhanced particle colors for V4
const particleColors = {
  primary: [122, 156, 198, 0.6], // Soft blue
  secondary: [156, 174, 138, 0.4], // Sage
  accent: [212, 184, 134, 0.3], // Gold
};

// Update particle rendering with new color palette
particle.draw = function() {
  p.push();
  const colorIndex = Math.floor(this.x / p.windowWidth * 3);
  const color = particleColors[Object.keys(particleColors)[colorIndex]];
  p.fill(...color.slice(0, 3), color[3] * this.alpha * 255);
  p.noStroke();
  p.circle(this.x, this.y, this.size);
  p.pop();
};
```

## Implementation Summary

The V4 style guide represents a complete visual redesign that:

**Minimal V3B Inheritance:**
- P5.js particle background canvas (#0E2756)
- Base font stack only (font-heading and body fonts)
- All other design elements completely reimagined

**New Design Direction:**
- **Sophisticated Color Palette**: Cream, sage, and gold tones over dark blue
- **Refined Typography**: Completely new scale and weight system
- **Logo Integration**: Proper Paritee logo implementation throughout
- **Industry-Inspired Patterns**: Best practices from Team Farner, Noomo, RGA, and Pentagram
- **Clean Minimal Styling**: No glass-morphism or V3B visual treatments

**Key Features:**
1. **Full viewport scroll-snap sections** (Team Farner inspired)
2. **Progressive disclosure with elegant animations** (Team Farner)
3. **Smooth scroll testimonials** (Noomo inspired) 
4. **Subtle 3D typography effects** (Noomo inspired)
5. **Full-width toggle sections** (RGA inspired)
6. **Section carousels** (Pentagram inspired)
7. **Clean hierarchical footer** (Pentagram inspired)

This creates a sophisticated, contemporary experience that elevates Paritee's brand identity while maintaining excellent usability and performance characteristics.