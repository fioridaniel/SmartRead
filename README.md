# SnapText – Capture ideas, not screenshots

**SnapText** is a mobile app built with React Native, designed for readers who want to save important highlights quickly — without cluttering their gallery with screenshots or sending messages to themselves on WhatsApp.

## What it does

- Create folders and files to organize your reading content.
- Share text directly from other apps into selected files.
- Edit and view content easily within the app.
- Use checkboxes to mark which files will receive shared content.
- All data is stored locally using SQLite.

## Why this exists

When reading something valuable on your phone, it’s easy to lose track of important parts — especially if your solution is to take screenshots or open note apps every time. SnapText simplifies that: you just select your files and share the text. Done. It’s saved.

## Tech Stack

- **React Native** (UI + logic)
- **Expo SQLite** (local database)
- **React Navigation** (screen flow)
- *(Planned)* OCR integration for extracting text from images

## App Structure

```text
📁 src/
├── DatabaseContext.js        # SQLite database setup with folders & files
├── HomeScreen.js             # Create/access folders
├── FolderList.js             # View and delete folders
├── FileList.js               # Create, list, and manage files
├── FileDetail.js             # View and edit file contents
├── SetFilesFromShareInput.js # Append shared text to selected files
├── LoginScreen.js            # Simulated login page
├── styles.js                 # Global style definitions

