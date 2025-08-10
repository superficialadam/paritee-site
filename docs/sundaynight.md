# Overnight Website Design Iteration Project

I want you to iterate and create variations and improvements  to this site design. All new iterations should live under `/nightly/`.

## Phase 1: Base Implementation

**Target:** `/nightly/base`

Implement the sitemap from docs/sitemap.md using the design system in docs/styleguide-d.json. Use logo and  images in `public/` to populate relevant sections.

**Validation:** Run Puppeteer to ensure:

- No console errors or bugs
- Navigation functions correctly  
- Filtering systems work as expected
- All interactive elements respond properly

## Phase 2: Layout & Visual Design (Loop A)

**Targets:** `/nightly/design-a`, `/nightly/design-b`, `/nightly/design-c`

Spawn 3 expert web designer subagents, each with distinct specializations:

### Designer A - Layout Optimization Specialist

*Background: 6+ years in web design with focus on content hierarchy and grid systems. Slightly more conservative approach, emphasizing readability and structured layouts. Tends to prioritize clear information architecture and consistent spacing patterns.*

### Designer B - Visual Impact Specialist  

*Background: 7+ years in digital design with emphasis on striking visual presentation. Slightly more experimental with image treatments and color application. Tends to push visual boundaries while maintaining usability.*

### Designer C - User-Centered Design Specialist

*Background: 6+ years in web design with UX background. Slightly more focused on interaction patterns and user flow. Tends to optimize for accessibility and mobile-first responsive design.*

**Process for each designer:**

1. **MANDATORY:** First, thoroughly review and understand the design system in docs/styleguide-d.json.- all variations MUST adhere to established tokens, components, and guidelines
2. Study docs/styleguide-d.json. and interpret through their unique lens while staying within design system constraints
3. Redesign `/nightly/base` with focus on layout and image treatment
4. Implement different approaches to:
   - Grid systems and content hierarchy (within design system parameters)
   - Image sizing, cropping, and positioning  
   - Color palette application (using design system colors only)
   - Typography treatment (using design system type scale)
   - Spacing and proportions (following design system spacing tokens)
5. Run Puppeteer for functionality testing
6. **CRITICAL:** Capture screenshots with Puppeteer to identify and fix any flagrant design problems
7. **NON-NEGOTIABLE:** Maintain strict adherence to the established design system

## Phase 3: Motion & Transitions (Loop B)

**Targets:** `/nightly/motion-a`, `/nightly/motion-b`, `/nightly/motion-c`

Spawn 3 expert motion design subagents:

### Motion Designer A - Smooth Transition Specialist

*Background: 5+ years in web animation focusing on polished, seamless interactions. Slightly more emphasis on subtle easing and refined timing. Tends toward elegant, understated motion that enhances usability.*

### Motion Designer B - Dynamic Interaction Specialist  

*Background: 6+ years in digital motion design with focus on engaging user feedback. Slightly more emphasis on playful hover states and scroll animations. Tends toward more noticeable but purposeful motion.*

### Motion Designer C - Performance-First Animator

*Background: 5+ years in web development with animation specialization. Slightly more emphasis on optimized, lightweight animations. Tends toward efficient motion systems that work well across all devices.*

**Process for each motion designer:**

1. Take inspiration from docs/styleguide-d.json for motion language
2. Select one design from Phase 2 (A, B, or C respectively)
3. Add CSS transitions and animations focusing on:
   - Page transition animations
   - Hover and focus states
   - Loading and state changes
   - Scroll-triggered animations
   - Navigation transitions
4. Ensure 60fps performance
5. Test with Puppeteer
6. **CRITICAL:** Capture screenshots with Puppeteer to identify and fix any flagrant design problems

## Phase 4: Generative Canvas Layer (Loop C)

**Targets:** `/nightly/canvas-a`, `/nightly/canvas-b`, `/nightly/canvas-c`

Spawn 3 expert creative coding subagents:

### Creative Coder A - Geometric Pattern Specialist

*Background: 4+ years in creative coding with focus on clean, mathematical compositions. Slightly more emphasis on structured, grid-based generative elements. Tends toward precise, algorithmic patterns that complement the design.*

### Creative Coder B - Organic Movement Specialist

*Background: 5+ years in interactive development with focus on fluid, natural motion. Slightly more emphasis on particle systems and flowing animations. Tends toward softer, more organic background elements.*

### Creative Coder C - Interactive Response Specialist

*Background: 4+ years in web development with generative art background. Slightly more emphasis on user-responsive canvas elements. Tends toward systems that react subtly to user behavior and page interactions.*

**Process for each creative coder:**

1. Reference docs/styleguide-d.json for visual direction and brand alignment
2. Select one result from Phase 3 (A, B, or C respectively)
3. Implement full-screen P5.js canvas with:
   - Z-index positioned above background, below content
   - Responsive to user interactions (mouse, scroll, clicks, sections)
   - Brand-appropriate color palette integration
   - Subtle interaction with page content/navigation
4. Ensure canvas doesn't interfere with usability
5. Test performance across devices
6. **CRITICAL:** Capture screenshots with Puppeteer to identify and fix any flagrant design problems
7. Document interaction patterns and parameters

## Phase 5: Creative Direction Synthesis (Loop D)

**Targets:** `/nightly/synthesis-a`, `/nightly/synthesis-b`, `/nightly/synthesis-c`

Spawn 3 expert creative director subagents:

### Creative Director A - Brand Consistency Specialist

*Background: 8+ years in creative direction with focus on cohesive brand expression. Slightly more emphasis on maintaining visual consistency across all elements. Tends toward refined synthesis that strengthens brand identity.*

### Creative Director B - User Experience Director

*Background: 9+ years in creative leadership with UX focus. Slightly more emphasis on optimizing user experience and accessibility. Tends toward synthesis that enhances usability while maintaining creative vision.*

### Creative Director C - Technical Innovation Director

*Background: 8+ years in digital creative direction with development background. Slightly more emphasis on technical execution and performance optimization. Tends toward synthesis that pushes technical boundaries efficiently.*

**Process for each creative director:**

1. Analyze all 9 previous versions (3 design × 3 motion × 3 canvas)
2. Identify the strongest elements from each approach
3. Create "best-of" synthesis combining:
   - Most effective layout patterns
   - Most compelling motion language  
   - Most successful canvas integration
   - Optimal balance of creativity and usability
4. Implement refined version addressing any identified issues
5. Test with pupeteer
6. **CRITICAL:** Capture screenshots with Puppeteer to identify and fix any flagrant design problems
7. Document design decisions and rationale

## Phase 6: Landing Page Creation

**Target:** `/nightly/index`

Create a  landing page featuring:

- Navigation to all 15 versions (base + 3 design + 3 motion + 3 canvas + 3 synthesis)

## Success Criteria

- All versions fully functional across devices
- No console errors or accessibility violations
- Smooth performance (60fps animations, <3s load times)
- Cohesive brand expression across all variations
- Clear documentation of learnings and recommendations
