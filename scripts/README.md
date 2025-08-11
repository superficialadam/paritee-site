# Unsplash Image Fetcher

This script downloads architectural and modern business images from Unsplash that match the style in the branding PDF.

## Setup

1. Get a free Unsplash API access key:
   - Go to https://unsplash.com/developers
   - Create an application
   - Copy your Access Key

2. Run the script with your API key:
   ```bash
   UNSPLASH_ACCESS_KEY=your_key_here node scripts/fetch-unsplash-images.js
   ```

## What it does

- Downloads 15 high-quality architectural images similar to the branding PDF style
- Saves them to `public/images/unsplash/`
- Creates a `credits.json` file with photographer attribution
- Images focus on:
  - Modern glass buildings with reflections
  - Concrete structures with geometric patterns
  - Contemporary architecture with clean lines
  - Corporate building exteriors
  - Minimalist architectural details

## Image Style

Based on the branding PDF, the script searches for:
- Glass facades and reflective surfaces
- Geometric architectural patterns
- Modern concrete and steel structures
- Minimalist building perspectives
- Corporate/business architecture
- Contemporary urban buildings

## Credits

The script automatically saves photographer credits. Always attribute images when using them in your project.