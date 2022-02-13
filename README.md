# Jesska

A showcase website for the Jesska series of slice of life comics.

[The Site](jesska.io)

[Instagram](https://www.instagram.com/jesska.io/)

## Running this Application

Within the project directory:

```yarn start```

Runs and lauches the application for development on localhost.

`yarn build`

Builds the application for production

## Releases

`1.0.0` Current

## Branch Overview

`main` 

The master branch.  This branch will be updated after each release when all hotfixes are completed.

`production`

The live branch.  Development branches will be merged before each release.

`development`

A branch to collect various bug fixes, features, or changes to the codebase.  Development branches should branch off and merge into the main development branch.

## Future Roadmap, Desired Improvements, and Bugs

Items in the rest of this document marked with `**` are due for update in future versions

- Fix the footer causing scroll issues, what the heck man

- Click for scroll down on mobile

- Use local define file for routing and do not depend on api results

- Clean up `useEffects`
  
  - Add dependencies to all use effects to avoid "lying" about dependencies
  
  - Move functions that don't rely on data streams outside the components to avoid new intances on re-renders
  
  - Each render has its own `useEffect` => rewrite code to reflect this pattern
  
  - https://overreacted.io/a-complete-guide-to-useeffect/

- Clean up css separataion
  
  - Try to move all css to components inside the visual components folder
    
    - Route define feels like it shouldn't have css
  
  - Adjust where css passes are passed to children as props

- On traversal using route buttons, the scroll handler should not adjust the url

- Sometimes the height is limited to the about page

- Clean up the project structure in regards to the scroll handler and route define sections

- Admin panel
  
  - Upload and change visibility of stories without updating the codebase or database directly
  
  - Detailed error logging
  
  - Instagram and Twitter bot to automatically post an update when a new story is published through the admin panel

- Email form for inquiries and to report errors

- Include GraphQL to type-check database queries and responses
  
  - This is currently done by casting api responses to pre-defined types

- ~~Add CDN for images to decrease loading time~~ Hosted on Firebase

- Add a NodeJS backend so the site can be hosted on a cloud instance instead of ~~Netlify~~ Hosted on Firebase
  
  - Allow for editing of local files on site server such that routes can be delcaratively defined and maintained  

- Move project to NextJS for server side rendering and more declarative route defines

- Move animations to a separate library

## Technical Design Overview

Jesska is currently built with a React front-end written in TypeScript, a Firebase Firestore database, and Firebase Storage for storing images.  The structure of Jesska's visual components is inspired by atomic design, organizing components into groups of relative complexity.  Outside of the visual components structure, Jesska is largely organized by groupings of related functionalty.  Application state is divided and maintained by several contexts such as theme, language, and loading state.  Each provides a named wrapper for  `useContext` that exposes the state to children which depend on it and if necessary, provides a means of updating the state.

## Application Flow Overview

#### On Page Load

- Set the application's loading context to the `visualStoriesLoading` loading state

- **Query database for currently active stories

- **Create the routes in the`StoryNavigation` component based on the returned story list

- Create `Story` components for each story in the story list
  
  - If the story is currently visible or in the vacinity of the visible story, notify the loading context.  Set component's loading state to `loading`
    
    - Query the database to get references to images stored in the storage bucket
    
    - Load images from the setorage bucket

- `ScrollHandler` detects a change in the history and snaps to the active story

- When the visible story is loaded, set the components loading state to `loaded` and notify the loading context

- Set application's loading context to the `visualStoriesLoaded` state

- When all background stories are loaded, update the application's loading state to `fullyLoaded`

#### On Scroll

- Update `placeholder`, `background`, and `visible` stories
  
  - Unload `placeholder` stories (far from currently visible story)
  
  - Background load `background` stories (close to visible story)
  
  - Update the visibility of the current story

- `ScrollHandler` detects a full page scroll and updates the navigation bar url to match the currently visible story

- `ScrollHandler` detects a full page scroll and updates the `NavigationContext` with the current story index

- Navigation items on the right are adjusted to maintain the correct relative position to the active story

#### On Error

- Navigate to `ErrorPage` and include error type in state if necessary

- Display an error page
  
  - `404` Display missing story page with link to the home page
  
  - `Database Error` If an error occurs during the api call, an error page will be display but a link home will not be included

## Project Structure

#### Parent Folder Structure

```
./src
|–– App.tsx
|–– assets
    |–– buttonIcons
    |–– errors
|–– components
    |–– atoms
        |–– ComponentName
    |–– molecules
        |–– ErrorImages
            |–– ComponentName
        |–– ComponentName
    |–– organisms
        |–– ComponentName
    |–– staticPages
        |–– PageName
|–– database
|–– globalState
|–– hooksAndHelpers
|–– index.css
|–– index.tsx
|–– localization
    |–– translations
|–– react-app-env.d.ts
|–– routing
    |–– RouteDefine
|–– theme
    |–– themes
|–– types
```

#### Visual Component Folder Structure

```
ComponentName
|–– index.tsx
|–– styles.module.css
```

Code for a component's local state, functionality, and html structure are located in `index.tsx` and class names and local styles are imported from the css module `styles.module.css`

#### Theme and Language Components Folder Structure

```
[localization / theme]
|–– [Localization / Theme]Context.tsx
|–– [translations / themes]
    |–– [language 1 / theme 1]
    |–– [language 2 / theme 2]
|–– [translations / themes].ts
```

A context provider component, named `useContext` wrapper, and a function for toggling the language / theme are created in the `Context.tsx` file.  Translations are defined in JSON objects inside the `translations` folder while themes are stored in JSON like objects in `themes`.  The `translations.ts` file and `themes.ts` file create an object containing all translations and themes.

## **Story Structure

```
|–– Story
    |–– Scenes
        |–– Scene Image
        |–– English Translation
        |–– Japanese Translation
    |–– ...
```

An identical Jesska story structure is used in the storage bucket, database, and component structure of the front end.  Stories may have any number of scenes (at the moment all have 4), each of which must include a base scene image (art), an english translation, and a japanese translation.  Like the translations on the rest of the site, the story translation state is controlled by the Localization Context Provider.

## Notable Types

The types used in Jesska are prepended with `T` for easy understanding.

#### **TStory

```typescript
type TStory = {
    storyNameEnglish: string,
    storyNameJapanese: string,
    scenes: [
        scene_x: {
            storyboard: string,
            englishTranslation: string,
            japaneseTranslation: string
        },
        ...
    ]
}
```

The structure of story data created through combining calls to the database and storage bucket.

#### TColorTheme and TColors

```typescript
type TColorTheme = {
    themeName: "light" | "dark",
    colors: TColors
}

type TColors = {
    [colorName: string]: string
}
```

In the application, the key names of `TColors` are defined such that all themes must implement the same colors avoiding errors caused by incomplete or unmatching theme objects.

#### TTranslation

```typescript
type TTranslation = {
    currentLanguage: "english" | "japanese",
    [translationGroupName: string]: {
        [individualTranslation: string]: string
    },
    ...    
}
```

Translations include a reference to their language and are structured into translation groups.  Each groups represents translations of similar nature, ex. translations for the about page.  Within each translation group, and individual translation is given a name and associated translation.

## Notable Hooks and Helpers

`useReferredState`

Use `useRef` in the style of `useState`.  This is used in the `ScrollHandler` so that the `EventListener` assigned to the scroll object can use the current state.

**`useInitialize`

A wrapper for `useEffect` with an empty dependency array.  Used primarily for organization and visual differentiation between initialization focused `useEffect`s and continuosly listening `useEffect`s.

`use[ContextName]` 

A wrapper for `useContext` to more easily distinguish which context is being used.

`BrowserRouter` 

A custom router which mocks the `BrowserRouter` component supplied by `react-router-dom`.  This router expands on the `react-router-dom` router by taking a `BrowserHistory` object for history allowing for the history to be updated outside of react components

## Code Style Overview

#### Types

`T[TypeName]`    

Types are prepended by `T` and the first letter of each word is capitalized.

#### Component Props

`[ComponentName]Props`    

Component prop interfaces use the exact name of the component with `Props` appended.

#### Context Hooks

`use[ContextName]`    

Named context hooks (wrappers for `useContext`) are prepended by `use` and use the same name as the context they return.

#### Functions and Variables

`functionName`

`variableName`

`variableName_1, variableName_2`

Functions and variables are named in camel case and are unabbreviated.  Variables intended to be general and closely related are appended with a number. 
