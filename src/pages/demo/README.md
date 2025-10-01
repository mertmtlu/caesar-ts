# Demo Experience - Implementation Guide

## Overview

The Demo Experience provides a chrome-less, streamlined interface optimized for product demonstrations and videos. It features:

- **DemoLayout**: Minimal layout without sidebar or navigation
- **DemoAppsPage**: Unified grid displaying Programs, Workflows, and Remote Apps
- **DemoExecutionDetailPage**: Streamlined execution view
- **RichPreviewCard**: Advanced hover previews with video/image support

## Routes

- `/demo` - Main demo apps page
- `/demo/execution/:executionId` - Execution detail view

## Features

### 1. Unified App Grid

All accessible apps (Programs, Workflows, Remote Apps) are displayed in a single grid without tabs. Each card shows:
- App icon (custom or default based on type)
- Name and description
- Type badge
- Metadata (language, node count, etc.)
- Double-click to execute/launch

### 2. Rich Preview Cards

Hover over any app card to see an enhanced preview with:
- **Static images** (`.png`, `.jpg`)
- **Animated GIFs** (`.gif`)
- **Video previews** (`.mp4`) - auto-plays on hover
- **Feature highlights** - key features displayed as tags
- Beautiful gradient overlays and animations

### 3. Chrome-less Layout

- No sidebar navigation
- No top header bar
- Minimal floating controls (Exit Demo, User menu)
- Clean background gradient
- Optimized for screen recording

## Adding Preview Content to Apps

### Method 1: Direct in Code (for testing)

You can add preview content directly in the `DemoAppsPage.tsx` after fetching apps:

```typescript
// In loadAllApps(), after creating UnifiedAppItem
unifiedApps.push({
  id: program.id!,
  name: program.name!,
  // ... other fields ...
  preview: {
    // Option A: Static image
    image: '/path/to/preview-image.png',

    // Option B: Animated GIF
    gif: '/path/to/preview-animation.gif',

    // Option C: Video (recommended for best impact)
    video: '/path/to/preview-video.mp4',

    // Feature highlights (optional)
    features: [
      'Real-time Processing',
      'AI-Powered',
      'Cloud Native'
    ]
  }
});
```

### Method 2: Backend Integration (production)

For production use, extend your backend models:

#### Database Schema

```sql
-- Add to Programs table
ALTER TABLE Programs ADD COLUMN preview_image_url VARCHAR(500);
ALTER TABLE Programs ADD COLUMN preview_gif_url VARCHAR(500);
ALTER TABLE Programs ADD COLUMN preview_video_url VARCHAR(500);
ALTER TABLE Programs ADD COLUMN preview_features JSON;

-- Repeat for Workflows and RemoteApps tables
```

#### API Updates

Update your DTOs to include preview fields:

```typescript
// ProgramDto
interface ProgramDto {
  // ... existing fields ...
  previewImageUrl?: string;
  previewGifUrl?: string;
  previewVideoUrl?: string;
  previewFeatures?: string[];
}
```

Then map these fields in `DemoAppsPage.tsx`:

```typescript
preview: {
  image: program.previewImageUrl,
  gif: program.previewGifUrl,
  video: program.previewVideoUrl,
  features: program.previewFeatures
}
```

### Method 3: Configuration File (quick setup)

Create a preview config file:

```typescript
// src/config/demoPrevi ews.ts
export const DEMO_PREVIEWS: Record<string, PreviewContent> = {
  'program-id-1': {
    video: '/demo-videos/data-processor.mp4',
    features: ['Fast Processing', 'Batch Support', 'Cloud Storage']
  },
  'workflow-id-2': {
    gif: '/demo-gifs/workflow-execution.gif',
    features: ['Multi-step', 'Conditional Logic', 'Error Handling']
  },
  // ... more previews
};
```

Then import and use in `DemoAppsPage.tsx`:

```typescript
import { DEMO_PREVIEWS } from '@/config/demoPreviews';

// In loadAllApps()
unifiedApps.push({
  // ... other fields ...
  preview: DEMO_PREVIEWS[program.id!]
});
```

## Creating Preview Content

### Video Recommendations

For best results with video previews:

**Specifications:**
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1280x720 (720p) or 1920x1080 (1080p)
- **Bitrate**: 1-2 Mbps
- **Duration**: 10-15 seconds (loops automatically)
- **File Size**: Target < 5MB per video
- **Frame Rate**: 24-30 fps

**Content Tips:**
- Show the app in action (real UI/functionality)
- Keep it concise - highlight 1-2 key features
- Use smooth transitions
- Include some motion/animation
- Consider adding subtle text overlays

**Tools for Creating Videos:**
- **Screen recording**: OBS Studio, QuickTime, Windows Game Bar
- **Video editing**: DaVinci Resolve (free), Adobe Premiere, iMovie
- **Compression**: HandBrake (free), FFmpeg

**FFmpeg Compression Command:**
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -vf scale=1280:720 -an output.mp4
```

### GIF Recommendations

**Specifications:**
- **Resolution**: 1024x768 or smaller
- **Duration**: 5-10 seconds
- **File Size**: Target < 2MB
- **Frame Rate**: 10-15 fps
- **Colors**: Optimize to 256 colors max

**Tools:**
- **Creation**: ScreenToGif (Windows), Kap (Mac), Peek (Linux)
- **Optimization**: gifsicle, ezgif.com, gifcompressor.com

**gifsicle Optimization Command:**
```bash
gifsicle -O3 --colors 256 --lossy=80 input.gif -o output.gif
```

### Static Image Recommendations

**Specifications:**
- **Format**: PNG (with transparency) or JPG
- **Resolution**: 1280x720
- **File Size**: < 500KB
- **Content**: Screenshot of app UI or key functionality

## Performance Optimization

The preview system includes built-in optimizations:

1. **Lazy Video Loading**: Videos only load when card is hovered
2. **Smooth Transitions**: 300ms delay before video playback
3. **Auto-pause**: Videos pause when hover ends
4. **Intersection Observer Ready**: Can be extended for viewport-based preloading

### Adding Viewport-based Preloading

To preload videos when cards enter viewport:

```typescript
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const appId = entry.target.getAttribute('data-app-id');
        const app = apps.find(a => a.id === appId);
        if (app?.preview?.video) {
          // Preload video
          const video = document.createElement('video');
          video.src = app.preview.video;
          video.load();
        }
      }
    });
  }, { rootMargin: '100px' });

  // Attach to card elements
  document.querySelectorAll('[data-app-id]').forEach(el => {
    observer.observe(el);
  });

  return () => observer.disconnect();
}, [apps]);
```

## Best Practices for Demo Videos

1. **Plan Your Demo Flow**
   - Start with the apps page showing all cards
   - Hover over 2-3 cards to show previews
   - Double-click to execute one app
   - Show the execution output
   - Return to apps page

2. **Recording Settings**
   - Use 1920x1080 resolution
   - 60fps for smooth hover animations
   - Enable dark mode for better contrast
   - Hide cursor or use cursor highlighter

3. **Preparation**
   - Ensure 5-10 apps with varied previews
   - Test all execution paths
   - Clear browser console
   - Prepare sample data for executions
   - Practice the demo flow 2-3 times

4. **Presentation Tips**
   - Move cursor smoothly
   - Pause briefly on hover to show previews
   - Let videos play for 3-5 seconds
   - Show completed executions with output
   - Highlight key UI elements with cursor

## Troubleshooting

### Videos Not Playing

**Issue**: Videos don't play on hover
**Solutions**:
- Check video format (must be MP4 with H.264 codec)
- Verify video path is correct
- Check browser console for errors
- Ensure video is accessible (not blocked by CORS)
- Try with `muted` attribute (required for autoplay in most browsers)

### Preview Not Showing

**Issue**: Hover preview doesn't appear
**Solutions**:
- Verify `preview` object is populated in UnifiedAppItem
- Check that at least one of `image`, `gif`, or `video` is set
- Inspect element to ensure RichPreviewCard is rendering
- Check z-index conflicts with other elements

### Performance Issues

**Issue**: Lag or stuttering during hover
**Solutions**:
- Reduce video file sizes (target <5MB)
- Lower video resolution to 720p
- Use more aggressive compression
- Limit number of videos loaded simultaneously
- Implement viewport-based preloading

### Layout Issues

**Issue**: Preview overlay doesn't align properly
**Solutions**:
- Check parent container positioning
- Verify grid gap spacing
- Test with different screen sizes
- Adjust scale factor in RichPreviewCard (currently 1.05)

## Example Implementation

Here's a complete example with sample preview data:

```typescript
// In DemoAppsPage.tsx, after fetching programs
const samplePreviews: Record<string, PreviewContent> = {
  'python-data-processor': {
    video: '/demo-content/data-processor-demo.mp4',
    features: ['Pandas Integration', 'CSV/JSON Support', 'Data Visualization']
  },
  'ml-workflow': {
    gif: '/demo-content/ml-workflow-animation.gif',
    features: ['AutoML', 'Model Training', 'Prediction API']
  },
  'dashboard-app': {
    image: '/demo-content/dashboard-screenshot.png',
    features: ['Real-time Charts', 'Custom Widgets', 'Dark Mode']
  }
};

// Apply previews to apps
unifiedApps.forEach(app => {
  if (samplePreviews[app.id]) {
    app.preview = samplePreviews[app.id];
  }
});
```

## Future Enhancements

Potential improvements for future iterations:

1. **Interactive Previews**: Show actual app UI in iframe
2. **Preview Editing UI**: Admin panel to manage preview content
3. **CDN Integration**: Store preview content on CDN
4. **Analytics**: Track which previews drive most engagement
5. **A/B Testing**: Test different preview styles
6. **Preview Templates**: Pre-designed preview layouts
7. **Auto-generation**: Generate previews from app screenshots

## Support

For questions or issues:
- Check the browser console for errors
- Review this README thoroughly
- Test with sample preview content first
- Verify file paths and formats
- Check network tab for failed resource loads
