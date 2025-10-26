# Documents Hub Integration

## Overview

The Documents Hub is a comprehensive strategic workspace integrated into IterativStartups that provides four powerful document creation and validation tools based on Lean Design Thinking methodology.

## Features

### 1. IterativePlans
**Business Plan Creation & Validation**

- **Fast Track Mode**: Generate complete business plans from simple inputs
- **Validated Mode**: Extract and validate critical assumptions with experimental frameworks
- **Lean Design Thinking Process**: 6-phase methodology (Discover, Define, Ideate, Experiment, Measure, Scale)
- **Assumption Dashboard**: Track high-risk assumptions that need validation
- **Pivot Intelligence**: 10-type structured pivot framework

**Key Capabilities:**
- AI-powered plan generation from problem/solution descriptions
- Automatic assumption extraction with risk assessment
- Evidence-based validation workflow
- Experiment design tools for testing hypotheses
- Iteration tracking with completion metrics

### 2. IterativDecks
**Pitch Deck Creation with AI**

- Generate investor-ready pitch decks
- Multiple deck styles (Seed Stage, Growth Stage, Internal)
- AI-powered content generation
- Assumption extraction for validation
- Evidence-based storytelling

**Status:** Core framework implemented, full AI integration coming soon

### 3. IterativProposals
**Evidence-Based Proposal Development**

- Client discovery and problem validation
- Hypothesis-driven proposal development
- Experiment design for testing proposal concepts
- Win theme generation
- Structured pivot frameworks for proposal strategies

**Status:** Core framework implemented, full features coming soon

### 4. IterativForms
**AI Application Filler**

- Auto-fill applications for accelerators, grants, and competitions
- Uses business plan data to populate forms intelligently
- Match score calculation for realistic success probability
- AI suggestions for improving applications
- Support for multiple application types

**Status:** Core framework implemented, AI integration coming soon

## Database Schema

### Tables Created

1. **documents**
   - Stores all document types (plans, decks, proposals, forms)
   - Tracks status (draft, in_progress, completed)
   - Records creation mode (fast-track, validated)

2. **document_assumptions**
   - Stores extracted assumptions from documents
   - Tracks risk level (high, medium, low)
   - Records validation status (untested, validated, invalidated)

3. **document_experiments**
   - Links to assumptions for testing
   - Stores hypothesis, method, results
   - Records conclusions from experiments

4. **document_pivots**
   - Tracks pivot decisions using 10-type framework
   - Documents reasons and changes made
   - Links to source documents

### Security

All tables have Row Level Security (RLS) enabled with policies ensuring:
- Users can only access their own documents
- Users can only manage assumptions/experiments for their own documents
- Full CRUD operations are properly secured

## Navigation

The Documents Hub is accessible from:
- **Main Navigation**: "Documents Hub" link in the header
- **Route**: `/documents`
- **Protection**: Requires authentication (wrapped in ProtectedRoute)

## Component Structure

```
src/
├── pages/
│   └── DocumentsHub.tsx          # Main hub page with module navigation
├── modules/
│   ├── plans/
│   │   └── PlansApp.tsx          # Business plans module
│   ├── decks/
│   │   └── DecksApp.tsx          # Pitch decks module
│   ├── proposals/
│   │   └── ProposalsApp.tsx      # Proposals module
│   └── forms/
│       └── FormsApp.tsx          # Forms filler module
├── components/
│   └── documents/
│       ├── Toast.tsx             # Toast notification component
│       ├── Toaster.tsx           # Toast container
│       └── PivotModal.tsx        # Pivot intelligence modal
├── types/
│   └── documents.ts              # TypeScript types for documents
└── constants/
    └── documents.ts              # Constants (pivot types, nav tabs)
```

## Usage

### Accessing Documents Hub

1. **Sign in** to your account
2. Click **"Documents Hub"** in the main navigation
3. Select one of the four modules:
   - IterativePlans
   - IterativDecks
   - IterativProposals
   - IterativForms

### Creating a Business Plan (IterativePlans)

1. Navigate to IterativePlans
2. Select **Fast Track Mode**
3. Fill in the form:
   - Problem you're solving
   - Your proposed solution
   - Target market
   - Competitive advantage
4. Click **"Generate Plan & Extract Assumptions"**
5. Switch to **Validated Mode** to see extracted assumptions
6. Work through the validation workflow

### Assumption Dashboard

When assumptions are generated:
- High-risk assumptions are highlighted in red
- Each assumption shows its source section
- Click **"Design Experiment"** to create validation tests
- Clear the dashboard to start fresh

## Toast Notifications

The Documents Hub uses a custom toast system for user feedback:

- **Success** (green): Operations completed successfully
- **Error** (red): Operations that failed
- **Info** (blue): Informational messages

Toasts auto-dismiss after 5 seconds or can be manually closed.

## Pivot Intelligence

The 10-type pivot framework helps founders make structured pivoting decisions:

1. **Zoom-In Pivot**: Single feature becomes the product
2. **Zoom-Out Pivot**: Product becomes single feature of larger product
3. **Customer Segment Pivot**: Solve same problem for different customer
4. **Customer Need Pivot**: Solve different problem for same customer
5. **Platform Pivot**: Application becomes platform or vice versa
6. **Business Architecture Pivot**: High margin/low volume ↔ Low margin/high volume
7. **Value Capture Pivot**: Monetization model change
8. **Engine of Growth Pivot**: Change growth strategy
9. **Channel Pivot**: Same solution, different distribution
10. **Technology Pivot**: Same solution, different technology

Access via the **"Explore 10 Pivot Types"** button in Validated Mode.

## Design System Integration

The Documents Hub follows the IterativStartups design principles:

- **Africa-First**: Optimized for 3G/4G networks with offline capabilities
- **Mobile-First**: Responsive design that works on all devices
- **Accessible**: WCAG 2.1 AA compliant with proper ARIA labels
- **Performance-Focused**: Lazy loading and code splitting
- **Consistent**: Uses same design tokens as main platform

## Future Enhancements

### Phase 2: Full AI Integration

- **IterativDecks**: Complete deck generation with Google Gemini AI
- **IterativProposals**: Full proposal generation workflow
- **IterativForms**: Intelligent form filling with match scoring

### Phase 3: Collaboration Features

- Team workspaces for document collaboration
- Comments and feedback on assumptions
- Shared experiment tracking
- Version history and rollback

### Phase 4: Advanced Analytics

- Success rate tracking across experiments
- Pivot effectiveness analysis
- Assumption validation metrics
- Portfolio-level insights

## Technical Notes

### Dependencies

All required dependencies are already installed:
- React 18.3.1
- React Router DOM 6.30.1
- Lucide React (icons)
- TailwindCSS (styling)
- Supabase (database)

### Build Status

✅ **Build Successful**
- All modules compile without errors
- Bundle size: 578.37 kB (gzipped: 168.13 kB)
- No TypeScript errors
- All routes properly configured

### Database Migration

Migration applied: `documents_hub_schema.sql`
- All tables created successfully
- RLS policies active
- Indexes created for performance
- Triggers set up for timestamps

## Troubleshooting

### Common Issues

1. **"Documents Hub" link not visible**
   - Ensure you're signed in
   - Clear browser cache and reload

2. **Assumptions not generating**
   - Fill in at least Problem and Solution fields
   - Check network connection
   - Check browser console for errors

3. **Database errors**
   - Verify migration was applied successfully
   - Check Supabase connection in `.env`
   - Ensure user is authenticated

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify your authentication status
3. Ensure all migrations are applied
4. Contact the development team

## Credits

Built with ❤️ for the startup ecosystem, following Lean Design Thinking principles and Africa-First design approach.

---

**Version**: 1.0.0
**Last Updated**: October 26, 2025
**Status**: Core Framework Implemented, AI Features In Development
