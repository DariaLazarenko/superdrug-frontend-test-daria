# Superdrug Frontend Test

I have created a simplified version of the Superdrug website built with Angular. I took inspiration from real Superdrug website. I have used mobile-first approach.

## 🚀 Project Overview

It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.

### Key Features

- E-commerce-like design
- Responsive header and catalogue layouts
- Filtering system based on category
- Mobile-first design approach
- Accessible UI components
- Type-safe implementation with TypeScript
- Error, loading and empty states handling

## 🏗️ Architecture

### Components Structure

- **Header**: Header component
- **Catalogue**: Product display with filtering option
  - Filter Form (Angular Reactive Forms)
  - Product Grid (Responsive Layout)
  - Catalogue item component

### Technical Highlights

- Dedicated service for data fetching
- Strong typing with custom interfaces and enums
- Reactive Forms for filter implementation
- RxJS state management for loading scenario and data setting
- Derived filtered items from filter option and init data for immediate response
- Accessible keyboard navigation
- Alt text implementation for images
- Unit tests that cover key functionality
- Proper handling of different image sizes

### What I would improve

- Add e2e tests for even better test coverage and to test how application works as a whole
- Add 'Basket' logic using NgRx library to handle its state: adding/removing items
- Add separate page for catalogue items to display more information about the item (e.g. description)
- More diverce filtering/sorting capabilities

## 💻 Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## 👷 Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## 🧪 Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
