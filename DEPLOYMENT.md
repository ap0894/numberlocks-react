# Deployment Guide

This document provides detailed instructions for deploying Number Locks to various platforms.

## Pre-Deployment Checklist

- [ ] All tests passing (`npm run test`)
- [ ] TypeScript compilation clean (`npx tsc --noEmit`)
- [ ] Production build successful (`npm run build`)
- [ ] Local preview working (`npm run preview`)
- [ ] Version number updated in `package.json`
- [ ] CHANGELOG updated (if applicable)

## Web Deployment

### Option 1: Direct Web Host Deployment

1. **Build the production version:**
```bash
npm run build
```

2. **Upload the `dist/` directory to your webhost**

The `dist/` directory contains:
- Optimized JavaScript bundles
- CSS files
- Service worker for PWA
- All assets (images, audio, fonts)

3. **Configure your webhost:**
- Document root: `/dist`
- Enable gzip compression
- Set proper cache headers for assets
- Ensure HTTPS is enabled (required for PWA features)

### Option 2: GitHub Pages

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Add deploy script to package.json:**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Deploy:**
```bash
npm run deploy
```

4. **Configure GitHub Pages:**
- Go to repository Settings > Pages
- Source: `gh-pages` branch
- Save

### Option 3: Netlify

1. **Connect your GitHub repository to Netlify**

2. **Configure build settings:**
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18 or higher

3. **Deploy:**
- Automatic deployment on git push to main branch

### Option 4: Vercel

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel --prod
```

Or connect repository via Vercel dashboard.

## Mobile Deployment (Android)

### Prerequisites

- Android Studio installed
- Java JDK 17+
- Android SDK properly configured

### Steps

1. **Build web assets:**
```bash
npm run build
```

2. **Add Android platform (first time only):**
```bash
npx cap add android
```

3. **Sync Capacitor:**
```bash
npx cap sync android
```

4. **Open in Android Studio:**
```bash
npx cap open android
```

5. **Update version in Android Studio:**
- Open `android/app/build.gradle`
- Update `versionCode` and `versionName`

6. **Generate signed APK/AAB:**
- Build > Generate Signed Bundle / APK
- Choose AAB (preferred) or APK
- Create or use existing keystore
- Select build variant (release)
- Wait for build to complete

7. **Test the build:**
- Install APK on device: `adb install app-release.apk`
- Or run directly: `npx cap run android`

8. **Upload to Google Play Console:**
- Create app in Google Play Console
- Upload AAB file
- Fill in store listing details
- Submit for review

### Troubleshooting Android

**Build errors:**
```bash
# Clean and rebuild
cd android
./gradlew clean
cd ..
npx cap sync android
```

**Keystore issues:**
- Keep keystore file safe (required for app updates)
- Never commit keystore to git
- Store passwords securely

## Mobile Deployment (iOS)

### Prerequisites

- macOS with Xcode installed
- Apple Developer account
- iOS device for testing (recommended)

### Steps

1. **Build web assets:**
```bash
npm run build
```

2. **Add iOS platform (first time only):**
```bash
npx cap add ios
```

3. **Sync Capacitor:**
```bash
npx cap sync ios
```

4. **Open in Xcode:**
```bash
npx cap open ios
```

5. **Configure in Xcode:**
- Select App target
- General tab:
  - Update version and build number
  - Set bundle identifier
  - Select team (requires Apple Developer account)
- Signing & Capabilities:
  - Enable Automatic Signing
  - Select provisioning profile

6. **Build and Archive:**
- Product > Archive
- Wait for archive to complete
- Organizer window will open

7. **Validate and distribute:**
- Select archive
- Click "Validate App"
- Fix any issues
- Click "Distribute App"
- Choose App Store Connect
- Upload

8. **Submit via App Store Connect:**
- Go to App Store Connect
- Complete app information
- Submit for review

### Troubleshooting iOS

**Signing errors:**
- Ensure Apple Developer account is active
- Check bundle identifier matches
- Verify provisioning profile is valid

**Build errors:**
```bash
# Clean derived data
cd ios
rm -rf DerivedData
pod install
cd ..
npx cap sync ios
```

## Environment-Specific Configuration

### Production Environment Variables

Create a `.env.production` file:
```
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ADMOB=true
```

### Development vs Production

The app automatically detects the platform:
- Web: Full PWA features
- Android: Native features via Capacitor
- iOS: Native features via Capacitor

## Post-Deployment

### Verify Deployment

**Web:**
- [ ] PWA install prompt works
- [ ] Offline mode works (disable network)
- [ ] All assets load correctly
- [ ] HTTPS enabled
- [ ] Service worker registered

**Mobile:**
- [ ] App launches correctly
- [ ] Native features work (haptics, status bar)
- [ ] Sound effects play
- [ ] Progress persists across restarts
- [ ] No console errors

### Monitoring

Set up monitoring for:
- Error tracking (e.g., Sentry)
- Analytics (Firebase Analytics)
- Performance metrics
- User feedback

## Rollback Procedure

### Web

1. Revert git commit: `git revert HEAD`
2. Rebuild: `npm run build`
3. Redeploy

### Mobile

- Cannot rollback published apps
- Submit bug fix update instead
- Use staged rollout to limit impact

## Version Management

### Semantic Versioning

Follow semver: MAJOR.MINOR.PATCH

- **MAJOR:** Breaking changes
- **MINOR:** New features
- **PATCH:** Bug fixes

### Update Checklist

1. Update `package.json` version
2. Update `android/app/build.gradle` (versionCode, versionName)
3. Update `ios/App/App/Info.plist` (CFBundleShortVersionString, CFBundleVersion)
4. Create git tag: `git tag v1.0.0`
5. Push tag: `git push origin v1.0.0`

## Security Considerations

### Before Deployment

- [ ] Remove console.log statements (done via terser)
- [ ] No API keys in source code
- [ ] HTTPS enforced
- [ ] Content Security Policy configured
- [ ] Input validation in place

### Secrets Management

- Use environment variables for sensitive data
- Never commit:
  - API keys
  - Analytics tokens
  - AdMob IDs (use config files)
  - Signing keystores

## Performance Optimization

Already implemented:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Gzip compression
- ✅ Asset caching
- ✅ Service worker

## Support & Maintenance

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update Capacitor
npm install @capacitor/core@latest @capacitor/cli@latest
npx cap sync
```

### Test After Updates

```bash
npm run test
npm run build
npx cap sync
```

---

**For issues or questions, refer to:**
- [README.md](./README.md) - General documentation
- [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) - Architecture details
- [GitHub Issues](https://github.com/ap0894/numberlocks-react/issues)
