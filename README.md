# 📸 Expo Event Gallery App

A high-performance, aesthetically pleasing mobile application built with **React Native (Expo)**, demonstrating clean code practices, industry-standard libraries, and scalable architecture.

## 🚀 Features

- **Event Showcase**: Browse a curated list of events with beautiful pill-style UI.
- **Event Details**: Immersive detail screen with hero images and description.
- **Infinite Gallery**: Smooth scrolling image gallery powered by Unsplash.
- **Photo Viewer**: Full-screen photo experience with pinch-to-zoom and swipe gestures.
- **Dark/Light Mode Ready**: Themed using design tokens.

## 🛠 Tech Stack

- **Framework**: React Native (via Expo SDK 50+)
- **Language**: TypeScript
- **Navigation**: React Navigation (Native Stack)
- **Data Fetching**: TanStack Query (React Query)
- **Images**: `expo-image` (Best-in-class caching & performance)
- **List Performance**: `@shopify/flash-list` (Recycling for smooth scrolling)
- **Zoom/Swipe**: `react-native-image-viewing`

## 🏗 Architecture & Best Practices

- **Feature-First Structure**: `src/screens`, `src/components`, `src/hooks`, `src/api` organization.
- **Custom Hooks**: specialized hooks like `usePhotos` and `useEvents` separate logic from UI.
- **Environment Variables**: Unsplash API key is securely loaded via `EXPO_PUBLIC_`.
- **Error Handling**: Graceful error states and retry mechanisms.
- **Optimization**: `FlashList` for memory efficiency, lazy loading for API requests, and `expo-image` transition animations.

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repo_url>
   cd <repo_name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the root.
   - Add your Unsplash Access Key:
     ```
     EXPO_PUBLIC_UNSPLASH_KEY=your_actual_unsplash_access_key
     ```
   - *Note*: You can get a free key from [Unsplash Developers](https://unsplash.com/developers).

4. **Run the App**
   ```bash
   npx expo start
   ```
   - Press `a` for Android emulator.
   - Press `i` for iOS simulator.
   - Scan the QR code with Expo Go on your physical device.

## 🖼 Screenshots

*(Placeholders for screenshots)*

## 💡 Decisions Made

- **FlashList vs FlatList**: Chosen FlashList for the Gallery screen due to the heavy image load. FlashList's recycling architecture maintains 60fps even with hundreds of high-res images.
- **TanStack Query**: Used for its robust caching and "infinite query" support out of the box, simplifying the pagination logic significantly.
- **Expo Image**: Standard `Image` component often flickers or doesn't cache aggressively enough. `expo-image` provides a native-feel transition and memory management.

---

Built with ❤️ by Prathamesh
