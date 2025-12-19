#!/bin/bash

# Post-sync script to apply custom iOS configurations that get reset by cap sync

echo "🔧 Applying custom iOS configurations..."

# Update UILaunchStoryboardName to LaunchScreen (without .storyboard extension)
/usr/libexec/PlistBuddy -c "Set :UILaunchStoryboardName LaunchScreen" ios/App/App/Info.plist

# Ensure UIRequiresFullScreen is false (for iPad support)
if ! /usr/libexec/PlistBuddy -c "Print :UIRequiresFullScreen" ios/App/App/Info.plist 2>/dev/null; then
  /usr/libexec/PlistBuddy -c "Add :UIRequiresFullScreen bool false" ios/App/App/Info.plist
else
  /usr/libexec/PlistBuddy -c "Set :UIRequiresFullScreen false" ios/App/App/Info.plist
fi

# Add encryption exemption (app doesn't use custom encryption)
if ! /usr/libexec/PlistBuddy -c "Print :ITSAppUsesNonExemptEncryption" ios/App/App/Info.plist 2>/dev/null; then
  /usr/libexec/PlistBuddy -c "Add :ITSAppUsesNonExemptEncryption bool false" ios/App/App/Info.plist
else
  /usr/libexec/PlistBuddy -c "Set :ITSAppUsesNonExemptEncryption false" ios/App/App/Info.plist
fi

echo "✅ Custom iOS configurations applied"
