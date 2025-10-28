# AI File Operations Safety & Approval System

## Overview

This document describes the new safety and approval system for AI-suggested file operations. The system addresses two critical issues:

1. **Direct Database Writes**: Previously, file operations (CREATE/UPDATE/DELETE) were written directly to the database without user approval
2. **No Preview/Approval**: Users had no way to review changes before they were applied

## Critical Fix: Proper Diff Display

### The Problem
When AI returns an UPDATE operation with the **entire file content**, the diff viewer would show:
- ❌ All lines as additions (green)
- ❌ No deletions (red)
- ❌ Can't see what actually changed

### The Solution
Before staging operations, we now:
1. **Capture original content** from currently open files (`file.originalContent`)
2. **Fetch original content** from backend for unopened files via API
3. **Store both versions** in the staging map
4. **DiffViewer compares**: original (from DB) vs. modified (from AI)

This provides a **true diff** showing:
- ✅ Red lines (-) for deletions
- ✅ Green lines (+) for additions
- ✅ Clear view of what changed

### Implementation Detail
```typescript
// In AIChatPanel.tsx - handleSend()
const contentsMap = new Map<string, string>();

// Add currently open files (use originalContent, not current)
openFiles.forEach(file => {
  contentsMap.set(file.path, file.originalContent || file.content);
});

// Fetch original content for unopened files from backend
for (const op of fileOperations) {
  if (!contentsMap.has(op.filePath)) {
    const response = await api.files.files_GetVersionFile(programId, versionId, op.filePath);
    const originalContent = base64ToUtf8(response.data.content);
    contentsMap.set(op.filePath, originalContent);
  }
}

// Now stageOperations has proper original content for diff
stageOperations(fileOperations, contentsMap);
```

## Solution Architecture

### Two Operating Modes

#### 1. Safe Mode (Default) - `autoApplyFileOperations: false`
**Flow:**
```
AI Response → Stage Operations → Show Git-Style Diff Review → User Approves → Apply to Editor State → User Clicks Save → DB Write
```

**Key Features:**
- Operations are **staged** for review (never applied automatically)
- Git-style diff view shows line-by-line changes
- User can approve/reject individual operations or all at once
- Changes only modify editor state (mark as `isModified`)
- Database writes happen when user clicks the existing "Save" button
- Safe by default - prevents accidental modifications

#### 2. Trust Mode (Opt-in) - `autoApplyFileOperations: true`
**Flow:**
```
AI Response → Apply to Editor State → User Clicks Save → DB Write
```

**Key Features:**
- Operations applied immediately to editor (like old behavior)
- Still requires manual Save for database writes
- Shows warning confirmation dialog when enabling
- Visual indicators show "Auto-Applied" badge
- For power users who trust the AI

## Implementation Details

### New Files Created

#### 1. `src/types/stagedOperations.ts`
Defines TypeScript interfaces for the staging system:
- `PendingFileOperation`: Represents an operation awaiting approval
- `OperationApplicationResult`: Result of applying operations

#### 2. `src/components/ai/DiffViewer.tsx`
Monaco-based diff viewer component:
- Shows side-by-side comparison (original vs modified)
- Syntax highlighting for 30+ languages
- Handles CREATE (empty → content), UPDATE (old → new), DELETE (content → empty)
- Dark/light theme support
- 300-400px configurable height

#### 3. `src/components/ai/FileOperationReviewPanel.tsx`
Main review UI component:
- Lists all staged operations with checkboxes
- Expandable sections showing diff for each file
- "Approve All" / "Reject All" / "Apply Selected" buttons
- Operation type badges (green=CREATE, yellow=UPDATE, red=DELETE)
- Shows approval progress (e.g., "2 of 5 operations approved")

### Modified Files

#### 1. `src/stores/aiStore.ts`
**Changes:**
- Added `autoApplyFileOperations: boolean` preference (default: `false`)
- Added `stagedOperations: PendingFileOperation[]` state
- New functions:
  - `stageOperations()`: Stage operations for review
  - `toggleOperationApproval()`: Toggle individual operation approval
  - `approveAllOperations()`: Approve all at once
  - `rejectAllOperations()`: Clear all staged operations
  - `clearStagedOperations()`: Clear after applying
  - `getApprovedOperations()`: Get operations marked for application

#### 2. `src/hooks/useFileOperations.ts`
**Changes:**
- Added `applyApprovedOperations()` function
- This function applies operations to editor state only (no DB writes)
- Marks files as `isModified` to enable "Save" button
- Works alongside existing `applyFileOperations()` for auto-apply mode

#### 3. `src/components/ai/AIChatPanel.tsx`
**Changes:**
- Checks `preferences.autoApplyFileOperations` to determine flow
- Captures original file contents before sending message (for diff)
- **Auto-apply mode**: Calls `applyFileOperations()` immediately
- **Safe mode**: Calls `stageOperations()` to show review panel
- Handles apply/reject actions from review panel
- Clears staged operations when applying or clearing conversation

#### 4. `src/components/ai/AIPreferencesPanel.tsx`
**Changes:**
- Added "Auto-apply Changes ⚠️" toggle switch
- Shows warning confirmation dialog when enabling
- Displays amber warning message when enabled
- Visual warning icon next to toggle

#### 5. `src/components/ai/MessageList.tsx`
**Changes:**
- Shows visual indicator badges:
  - **Auto-Applied** (⚡ amber badge): When trust mode is enabled
  - **Review Required** (🛡️ blue badge): When operations are staged
  - **Reviewed** (🛡️ blue badge): When operations were reviewed and applied
- Helps users understand how operations were handled

#### 6. `src/pages/editor/EditorPage.tsx`
**Critical Change - Database Write Prevention:**

**Old Behavior (REMOVED):**
```typescript
// For files not open in editor, UPDATE would:
await api.files.files_UpdateVersionFile(...); // ❌ Direct DB write!
await loadFiles(...); // ❌ Reload file tree
```

**New Behavior:**
```typescript
// For files not open in editor, UPDATE now:
const response = await api.files.files_GetVersionFile(...); // Fetch original
const newFile = {
  path,
  content: newAIContent,
  isModified: true,  // ✅ Mark as modified
  originalContent: originalFromDB
};
setOpenFiles(prev => [...prev, newFile]); // ✅ Add to editor state
// ✅ NO database write! User must click Save button
```

**Key Points:**
- `onCreateFile`: Marks file as `isNew` and `isModified` (no DB write)
- `onUpdateFile`: Opens file with new content if not open, marks as `isModified` (no DB write)
- `onDeleteFile`: Still calls API but this is intentional (DELETE operations are always explicit)
- All database writes now happen through the existing "Save" button workflow

## User Experience

### Safe Mode Flow (Default)

1. **User asks AI to make changes**
   - Types message: "Add error handling to the login function"

2. **AI responds with file operations**
   - Message shows operation badges: "1 UPDATE"
   - Blue badge shows "Review Required 🛡️"
   - Review panel appears at bottom of chat

3. **User reviews changes**
   - Clicks on operation to expand diff view
   - Sees side-by-side comparison with syntax highlighting
   - Green lines (+) show additions, red lines (-) show deletions
   - Can approve/reject individual operations or all at once

4. **User approves changes**
   - Clicks checkbox on operations to approve
   - Clicks "Apply 3 Selected" button
   - Operations applied to editor, files marked as modified
   - Review panel disappears
   - Editor shows unsaved changes indicator

5. **User saves to database**
   - Reviews final changes in editor
   - Clicks "Save" button (existing workflow)
   - Database writes happen
   - Changes persisted

### Trust Mode Flow (Opt-in)

1. **User enables trust mode**
   - Opens AI Preferences panel
   - Toggles "Auto-apply Changes ⚠️"
   - Confirms warning dialog: "⚠️ Warning: Auto-applying changes will modify your database without approval. Are you sure?"

2. **User asks AI to make changes**
   - Types message: "Refactor the user service"

3. **AI responds and applies immediately**
   - Operations applied to editor automatically
   - Amber badge shows "Auto-Applied ⚡"
   - No review panel shown
   - Files marked as modified
   - Editor shows unsaved changes

4. **User saves to database**
   - Clicks "Save" button
   - Database writes happen

## Visual Indicators

### Badges

| Badge | Color | Icon | Meaning |
|-------|-------|------|---------|
| `Review Required` | Blue | 🛡️ | Operations are staged for approval |
| `Reviewed` | Blue | 🛡️ | Operations were approved and applied |
| `Auto-Applied` | Amber | ⚡ | Operations were applied immediately (trust mode) |

### Operation Type Colors

| Type | Color | Description |
|------|-------|-------------|
| CREATE | Green | Creating new files |
| UPDATE | Yellow | Modifying existing files |
| DELETE | Red | Deleting files |

## Safety Features

### 1. No Premature Database Writes
- ✅ CREATE: Only adds to editor state (marks `isNew`, `isModified`)
- ✅ UPDATE: Only updates editor state or opens file with changes (marks `isModified`)
- ⚠️ DELETE: Calls API but requires explicit approval first
- ✅ All writes require user clicking "Save" button

### 2. Confirmation Dialogs
- Enabling trust mode requires confirmation
- Clearing conversation with staged operations asks for confirmation

### 3. Visual Warnings
- Amber warning color for trust mode toggle
- ⚠️ Warning icon next to auto-apply setting
- Persistent warning message when trust mode is enabled

### 4. Granular Control
- Users can approve/reject individual file operations
- "Approve All" and "Reject All" for batch operations
- "Apply Selected" only applies checked operations

### 5. Diff Preview
- See exact changes before applying
- Line-by-line comparison with syntax highlighting
- Understand impact before committing

## Testing

### Test Proper Diff Display (Critical)

This test verifies the fix for showing actual changes instead of all additions.

1. **Setup**:
   - Open editor for a project
   - Open a file with some existing content (e.g., `main.py` with a function)
   - Ensure auto-apply is OFF (safe mode)

2. **Ask AI to modify the file**:
   - Type: "Add error handling to the function in main.py"
   - AI returns UPDATE operation with full file content

3. **Open review panel**:
   - Review panel appears at bottom
   - Click on the UPDATE operation to expand

4. **Verify proper diff** ✅:
   - **Red lines (-)**: Should show original lines being removed
   - **Green lines (+)**: Should show new lines being added
   - **Unchanged lines**: Should appear in both sides (no color)
   - **NOT all green**: If you see only green additions, the fix isn't working

5. **Example of correct diff**:
   ```diff
   - def login(user):
   -     return authenticate(user)
   + def login(user):
   +     try:
   +         return authenticate(user)
   +     except AuthError as e:
   +         log_error(e)
   +         return None
   ```

6. **Example of INCORRECT diff** (old bug):
   ```diff
   + def login(user):
   +     try:
   +         return authenticate(user)
   +     except AuthError as e:
   +         log_error(e)
   +         return None
   ```
   (Everything green, no context of what changed)

### Test Safe Mode

1. **Open editor** for any project
2. **Verify default**: AI Preferences should show auto-apply is OFF
3. **Ask AI**: "Create a new file called test.js with a hello world function"
4. **Verify staging**:
   - Review panel appears at bottom
   - Operation listed with checkbox (unchecked)
   - Blue "Review Required" badge shown
5. **Expand operation**: Click chevron to see diff
6. **Verify diff**: Shows empty → content with syntax highlighting
7. **Approve**: Check the checkbox
8. **Apply**: Click "Apply 1 Selected"
9. **Verify editor**:
   - New tab opens for test.js
   - File content appears
   - Tab shows unsaved indicator (dot)
10. **Verify no DB write**: Refresh page - file should NOT exist in file tree yet
11. **Save**: Click "Save" button
12. **Verify DB write**: File now persists after refresh

### Test Trust Mode

1. **Enable trust mode**:
   - Open AI Preferences
   - Toggle "Auto-apply Changes ⚠️"
   - Confirm warning dialog
   - Verify amber warning message appears
2. **Ask AI**: "Add a comment to test.js"
3. **Verify auto-apply**:
   - NO review panel shown
   - Amber "Auto-Applied ⚡" badge shown
   - File updated immediately
   - Tab shows unsaved indicator
4. **Save**: Click "Save" button to persist

### Test Mixed Operations

1. **Safe mode enabled**
2. **Ask AI**: "Create utils.js, update test.js, and delete old.js"
3. **Verify review panel**: Shows 3 operations (CREATE, UPDATE, DELETE)
4. **Approve selectively**: Check CREATE and UPDATE only
5. **Apply**: Only 2 operations applied, delete not executed
6. **Approve delete**: Return to review, check DELETE
7. **Apply**: Now delete is executed

## Configuration

### Default Settings

```typescript
preferences: {
  verbosity: 'normal',
  explainReasoning: true,
  suggestBestPractices: true,
  maxFileOperations: 5,
  contextMode: 'balanced',
  autoApplyFileOperations: false, // Safe by default
}
```

### Changing Settings

Users can toggle `autoApplyFileOperations` via:
- AI Preferences panel (expandable section in AI chat)
- Located under "Toggles" section
- Warning confirmation required to enable

## Backward Compatibility

### For Power Users

The old "instant apply" behavior is preserved as **Trust Mode**:
- Enable via AI Preferences toggle
- No breaking changes for users who prefer instant feedback
- Still safer than before (no direct DB writes, requires Save)

### For New Users

Default safe mode provides:
- No surprises - always see changes before applying
- Learn what AI is doing through diff view
- Confidence to experiment with AI suggestions
- Prevent accidental destructive changes

## Troubleshooting

### Issue: Review panel doesn't appear
**Solution:** Check AI Preferences - auto-apply might be enabled

### Issue: Can't apply operations (button disabled)
**Solution:** Check at least one operation with the checkbox

### Issue: Changes not persisting after applying
**Solution:** Click the "Save" button to write to database

### Issue: DELETE operations still write to DB immediately
**Note:** This is intentional - DELETE operations are explicit and always shown in review panel first

### Issue: Diff shows all green lines for unopened files
**Solution:** This has been fixed! The system now:
- Fetches original content from backend via API for files not currently open
- Uses `file.originalContent` for currently open files (not `file.content` which may have unsaved changes)
- Provides proper diff showing deletions (red) and additions (green)

**If still seeing this issue:**
1. Check browser console for API errors fetching original content
2. Verify the file exists in the database (CREATE operations will correctly show all green)
3. Check that `programId` and `versionId` are correctly passed to AIChatPanel

## Markdown Rendering ✅

**Status:** Implemented

AI responses now support **standard Markdown formatting** (CommonMark specification only).

### Supported Features
- ✅ **Headers**: `#` H1, `##` H2, `###` H3
- ✅ **Lists**: Bulleted (`-`, `*`) and numbered (`1.`)
- ✅ **Bold**: `**text**` or `__text__`
- ✅ **Italic**: `*text*` or `_text_`
- ✅ **Inline code**: `` `code` ``
- ✅ **Code blocks**: Fenced with triple backticks
- ✅ **Links**: `[text](url)` - opens in new tab
- ✅ **Blockquotes**: `> quote`
- ✅ **Line breaks**: `\n` characters

### NOT Supported (GitHub Flavored Markdown - Forbidden)
- ❌ Tables
- ❌ Task lists `[ ]` and `[x]`
- ❌ Strikethrough `~~text~~`
- ❌ Autolinks
- ❌ Footnotes
- ❌ Definition lists
- ❌ Other GFM-specific features

### Implementation Details
- **Library**: `react-markdown` v10.1.0
- **NO** `remark-gfm` plugin (as per requirements)
- **Custom renderers** for consistent styling
- **Dark/light theme** support
- **Code syntax highlighting** with Monaco theme colors
- **User messages**: Plain text (no Markdown)
- **Assistant messages**: Full Markdown rendering

### Backend Usage
The backend can format AI responses using standard Markdown:

```typescript
displayText = "Here are the changes:\n- Added error handling\n- Fixed bug in login\n\nSee `main.py` for details."
```

This renders as:
```
Here are the changes:
• Added error handling
• Fixed bug in login

See main.py for details.
```

### Styling
- **Inline code**: Gray background, monospace font
- **Code blocks**: Dark background, light text
- **Links**: Blue with hover underline
- **Lists**: Proper spacing and indentation
- **Headers**: Bold with appropriate sizing
- **Blockquotes**: Left border, italic, indented

## Future Enhancements

Potential improvements for consideration:

1. **Undo/Rollback**: Add ability to undo applied operations
2. **Partial Application**: Apply only specific lines from a diff
3. **Side-by-side Save**: Show what would be saved before clicking Save
4. **Operation History**: Track and review past applied operations
5. **Batch Operations**: Queue multiple AI responses before applying
6. **Conflict Resolution**: Handle cases where file changed since staging
7. **Keyboard Shortcuts**: Add shortcuts for approve/reject actions
8. **Syntax Highlighting**: Enhanced code block highlighting with language detection

## Conclusion

This safety system provides:
- ✅ **Safe by default**: No accidental database modifications
- ✅ **User control**: Review and approve all changes
- ✅ **Transparency**: See exactly what AI is doing
- ✅ **Flexibility**: Trust mode for power users
- ✅ **Leverage existing workflows**: Uses existing Save button
- ✅ **Git-like UX**: Familiar diff review experience
- ✅ **No breaking changes**: Opt-in dangerous mode preserves old behavior

The implementation successfully addresses both concerns:
1. Prevents direct database writes by using staging layer
2. Provides git-style diff preview with granular approval controls
