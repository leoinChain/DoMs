# Chart Inventory

This document catalogs all charts and progress indicators used across the application, categorized by data type.

## Categories

### 1. Data That Changes Over Time (Dynamic Data)
These charts display metrics that update as the study progresses and participants complete activities.

### 2. Data Known at the Beginning (Static/Initial Data)
These charts display metrics that are set when the study is created and remain constant throughout the study lifecycle.

---

## Chart Components Inventory

### SegmentedProgress Component
**Location**: `src/components/SegmentedProgress.tsx`
**Type**: Progress indicator with 12 segments
**Visual Style**: Segmented bars with filled/unfilled segments

---

## Dashboard Page (`src/pages/Dashboard.tsx`)

### Active Studies Table - Progress Column
- **Component**: `SegmentedProgress`
- **Data Type**: **Changes Over Time** ⏱️
- **Data Source**: `study.progress` (percentage: 94%, 78%, 24%)
- **Purpose**: Shows study completion progress
- **Updates**: As study milestones are reached, data is collected, participants complete steps
- **Location**: Table column "Progress"
- **Display Format**: Segmented bar + percentage text (e.g., "94%")

### Active Studies Table - Participants Column
- **Component**: Avatar stack + text
- **Data Type**: **Changes Over Time** ⏱️
- **Data Source**: 
  - `study.participants.avatars` (array of avatar initials)
  - `study.participants.count` (total count: 329, 156, 12)
  - `study.participants.enrolledOutOf` (X out of 100: 87, 42, 15)
- **Purpose**: Shows participant enrollment status
- **Updates**: As participants enroll or drop out
- **Location**: Table column "Participants"
- **Display Format**: Avatar stack + "+X" + "X out of 100"

### Active Studies Table - Average Conversion Column
- **Component**: Text + Badge
- **Data Type**: **Changes Over Time** ⏱️
- **Data Source**: `study.conversion` (percentage: 82%, 45%, 18%)
- **Purpose**: Shows conversion rate from screening to enrollment
- **Updates**: As participants complete screening and enrollment processes
- **Location**: Table column "Average Conversion"
- **Display Format**: Percentage + badge (low/medium/high/exceptional)

---

## Studies Page (`src/pages/Studies.tsx`)

### Active Studies Table - Progress Column
- **Component**: `SegmentedProgress`
- **Data Type**: **Changes Over Time** ⏱️
- **Data Source**: `study.progress` (percentage: 94%, 78%, 24%)
- **Purpose**: Shows study completion progress
- **Updates**: As study milestones are reached
- **Location**: Table column "Progress"
- **Display Format**: Segmented bar + percentage text

### Active Studies Table - Participants Column
- **Component**: Avatar stack + text
- **Data Type**: **Changes Over Time** ⏱️
- **Data Source**: 
  - `study.participants.avatars`
  - `study.participants.count`
  - `study.participants.enrolledOutOf` (X out of 100)
- **Purpose**: Shows participant enrollment status
- **Updates**: As participants enroll or drop out
- **Location**: Table column "Participants"
- **Display Format**: Avatar stack + "+X" + "X out of 100"

### Active Studies Table - Average Conversion Column
- **Component**: Text + Badge
- **Data Type**: **Changes Over Time** ⏱️
- **Data Source**: `study.conversion` (percentage)
- **Purpose**: Shows conversion rate
- **Updates**: As participants complete screening and enrollment
- **Location**: Table column "Average Conversion"
- **Display Format**: Percentage + badge

---

## StudyDashboard Page (`src/pages/StudyDashboard.tsx`)

### Enrollment Target Card - Progress Bar
- **Component**: `Progress` (smooth progress bar)
- **Data Type**: **Changes Over Time** ⏱️
- **Data Source**: 
  - `studyData.enrollmentTarget` (350 - static target)
  - `studyData.enrolled` (329 - current enrollment)
  - Calculated: `(enrolled / enrollmentTarget) * 100`
- **Purpose**: Shows progress toward enrollment target
- **Updates**: As participants enroll
- **Location**: Summary card "Enrollment Target"
- **Display Format**: Smooth progress bar + "329 enrolled" text

### Groups & Recruitment - Control Group Progress
- **Component**: `Progress` (smooth progress bar)
- **Data Type**: **Changes Over Time** ⏱️
- **Data Source**: 
  - `group.target` (200 - static target)
  - `group.current` (187 - current enrollment)
  - `group.percentage` (94% - calculated)
- **Purpose**: Shows progress toward group-specific enrollment target
- **Updates**: As participants are assigned to groups and enroll
- **Location**: "Groups & Recruitment" section
- **Display Format**: Progress bar + "187 / 200" + "94%"

### Groups & Recruitment - High Risk Group Progress
- **Component**: `Progress` (smooth progress bar)
- **Data Type**: **Changes Over Time** ⏱️
- **Data Source**: 
  - `group.target` (150 - static target)
  - `group.current` (142 - current enrollment)
  - `group.percentage` (95% - calculated)
- **Purpose**: Shows progress toward group-specific enrollment target
- **Updates**: As participants are assigned to groups and enroll
- **Location**: "Groups & Recruitment" section
- **Display Format**: Progress bar + "142 / 150" + "95%"

### Summary Cards - Static Metrics
- **Component**: Text display (no chart)
- **Data Type**: **Known at Beginning** 📋 (some) / **Changes Over Time** ⏱️ (others)
- **Data Source**:
  - **Groups Card**: `studyData.groups.length` (2) - **Known at Beginning** 📋
  - **Conversion Rate Card**: `studyData.conversionRate` (78.5%) - **Changes Over Time** ⏱️
  - **Needs Attention Card**: `studyData.needsAttention` (3) - **Changes Over Time** ⏱️
- **Purpose**: Display key study metrics
- **Updates**: 
  - Groups: Set at study creation (static)
  - Conversion Rate: Updates as participants complete screening/enrollment
  - Needs Attention: Updates as tasks are created/completed
- **Location**: Summary cards at top of page
- **Display Format**: Large number + description text

---

## Summary by Data Type

### ⏱️ Data That Changes Over Time
1. **Study Progress** (SegmentedProgress)
   - Dashboard: Active Studies table
   - Studies: Active Studies table
   - Updates as study milestones are completed

2. **Participant Enrollment** (Avatar stack + counts)
   - Dashboard: Active Studies table
   - Studies: Active Studies table
   - Updates as participants enroll/drop out

3. **Enrollment Target Progress** (Progress bar)
   - StudyDashboard: Enrollment Target card
   - Updates as participants enroll toward target

4. **Group Enrollment Progress** (Progress bar)
   - StudyDashboard: Groups & Recruitment section
   - Updates as participants are assigned and enroll in groups

5. **Conversion Rate** (Text + Badge)
   - Dashboard: Active Studies table
   - Studies: Active Studies table
   - StudyDashboard: Conversion Rate card
   - Updates as participants complete screening and enrollment

6. **Needs Attention Count** (Text)
   - StudyDashboard: Needs Attention card
   - Updates as tasks are created/completed

### 📋 Data Known at the Beginning
1. **Enrollment Target** (Number)
   - StudyDashboard: Enrollment Target card
   - Set when study is created (350)

2. **Group Targets** (Numbers)
   - StudyDashboard: Groups & Recruitment section
   - Set when study is created (Control Group: 200, High Risk: 150)

3. **Number of Groups** (Number)
   - StudyDashboard: Groups card
   - Set when study is created (2)

4. **Study Due Date** (Text)
   - Dashboard: Active Studies table
   - Studies: Active Studies table
   - Set when study is created

---

## Recommendations

1. **Consistency**: Consider using `SegmentedProgress` consistently across all progress indicators for visual consistency
2. **Real-time Updates**: Charts showing dynamic data should be connected to real-time data sources or polling mechanisms
3. **Static Data Caching**: Data known at the beginning can be cached and doesn't need frequent updates
4. **Visual Distinction**: Consider using different visual styles or colors to distinguish between dynamic and static metrics
