# Typography Inventory

This document catalogs all text elements used across the application for global typography management.

## Typography Hierarchy

### H1
- **Size**: 20px (defined in `index.css`)
- **Line Height**: 1.4
- **Usage**: Main page titles
- **Examples**:
  - "Activity" (Dashboard page)
  - "Studies" (Studies page)
  - "Participants" (Participants page)
  - "Settings" (Settings page)
  - "Cardiovascular Biomarker Discovery" (StudyDashboard page)

### H2
- **Size**: 20px (defined in `index.css`)
- **Line Height**: 1.4
- **Usage**: 
  - Dialog titles (`DialogTitle` component)
  - Section headings in cards
- **Examples**:
  - "Welcome to ImYoo" (Dialog)
  - Card section titles

### H3
- **Size**: 16px (defined in `index.css`)
- **Line Height**: 1.4
- **Usage**:
  - Onboarding tooltip titles
  - Card titles (`CardTitle` component)
  - Task titles in Dashboard
- **Examples**:
  - "View Current Collection" (OnboardingTooltip)
  - "Active Studies" (CardTitle)
  - "Outstanding Tasks" (CardTitle)
  - "Send Reward" (Task title)

### H4
- **Size**: 14px (defined in `index.css`)
- **Line Height**: 1.4
- **Usage**: 
  - Table headers (`<th>` elements)
  - Sub-headings in forms and cards
- **Examples**:
  - "Study", "Participants", "Due date" (Table headers in Dashboard)
  - "ID", "Age", "Gender" (Table headers in Participants page)
  - "Collection progress" (Table header)

### Paragraph (p)
- **Size**: 13px (defined in `index.css`)
- **Line Height**: 1.5
- **Usage**:
  - Dialog descriptions (`DialogDescription` component)
  - Onboarding tooltip descriptions
  - General paragraph text
  - Task descriptions
  - Study descriptions
- **Examples**:
  - "Let's get you started with a quick tour of the platform." (DialogDescription)
  - "You can now view your current collection of studies and participants." (OnboardingTooltip)
  - Task descriptions in Dashboard
  - Study descriptions in tables

### Description Text
- **Size**: 12px (text-sm)
- **Usage**:
  - Card descriptions (`CardDescription` component)
  - Page descriptions
  - Muted/helper text
- **Examples**:
  - "Manage your organization and team" (Settings page)
  - "Manage your organization details" (CardDescription)
  - "View all participants across studies." (Participants page)

### Labels
- **Size**: 12px (text-sm)
- **Font Weight**: Regular (400)
- **Usage**:
  - Form labels
  - Input field labels
  - Table headers
- **Examples**:
  - "Organization Name" (Settings form)
  - "Address" (Settings form)
  - "Study", "Participants", "Progress" (Table headers)
  - "Enter email to invite" (Settings form)

### Small Text / Supporting Text
- **Size**: 10px (text-[10px]) or 12px (text-xs)
- **Usage**:
  - Profile supporting text ("John Smith")
  - Badge text
  - Metadata (time ago, counts)
  - Language selector text
- **Examples**:
  - "John Smith" (Profile card)
  - "5d ago" (Task metadata)
  - "Supporting text" (Language selector)
  - Badge labels ("New", "Beta")

### Navigation Text
- **Size**: 12px (text-xs)
- **Font Weight**: Regular (400)
- **Usage**:
  - Sidebar navigation items
  - Tab navigation
- **Examples**:
  - "Dashboard", "Studies", "Participants", "Settings"
  - Tab items: "All", "Cardiovascular", "Gut Microbiome", etc.

### Button Text
- **Size**: 12px (text-xs)
- **Font Weight**: Medium (500) by default, Regular (400) with `font-regular` class
- **Usage**:
  - All button labels
- **Examples**:
  - "Skip", "Next", "Start Tour"
  - "View", "Start"
  - "Save", "Delete Account"
  - "+ Invite"
  - "Logout"

### Table Text
- **Headers**: 14px (text-sm), Regular weight, muted color
- **Body**: 14px (text-sm) or Regular weight for primary data
- **Usage**:
  - Table headers and cells
- **Examples**:
  - Table headers: "Study", "Participants", "Progress", etc.
  - Table cells: Study names, participant counts, dates

## Current Typography Classes

### Font Weights
- `font-light`: 300 (Inter Light)
- `font-regular`: 400 (Inter Regular)
- `font-medium`: 500 (default for buttons)
- `font-semibold`: 600 (default for CardTitle)

### Font Sizes
- `text-xs`: 13px (0.75rem)
- `text-sm`: 14px (0.875rem)
- `text-base`: 16px (1rem)
- `text-lg`: 16px (1.125rem)
- `text-xl`: 18px (1.25rem)
- `text-2xl`: 20px (1.5rem)
- Custom: `text-[10px]`, `text-[14px]`, `text-[18px]`, `text-[20px]`

### Text Colors
- `text-foreground`: Primary text color
- `text-muted-foreground`: Secondary/muted text
- `text-[#0D5C43]`: Active state green
- `text-[#525252]`: Inactive gray
- `text-[#7C7C7C]`: Supporting text gray
- `text-[#2E7054]`: Profile name green

## Component-Specific Typography

### CardTitle
- Currently: `text-2xl font-semibold` (24px, semibold)
- Used with: `font-light` override in many places
- Should be: H3 (18px) based on inventory

### CardDescription
- Currently: `text-sm text-muted-foreground` (14px)
- Matches: Description text standard

### DialogTitle
- Currently: `text-[20px] font-regular` (20px, regular)
- Matches: H2 standard

### DialogDescription
- Currently: `text-[14px] text-muted-foreground` (14px)
- Matches: Paragraph standard

## Recommendations for Global Updates

1. **H1**: Define as 24px or 28px for main page titles
2. **H2**: Keep at 20px (already defined)
3. **H3**: Keep at 18px (already defined)
4. **H4**: Define as 16px for sub-section headings
5. **Paragraph**: Keep at 14px (already defined)
6. **Description**: Keep at 14px (text-sm)
7. **Labels**: Keep at 14px (text-sm) with regular weight
8. **Small Text**: Standardize to 12px (text-xs) or 10px (text-[10px])

## Files to Update for Global Typography

1. `src/index.css` - Base typography definitions
2. `src/components/ui/card.tsx` - CardTitle and CardDescription
3. `src/components/ui/dialog.tsx` - DialogTitle and DialogDescription
4. `src/pages/*.tsx` - All page components
5. `src/components/Sidebar.tsx` - Navigation text
6. `src/components/OnboardingTooltip.tsx` - Tooltip text
