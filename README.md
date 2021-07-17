# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- JavaScript ES6
- Mobile-first workflow

### What I learned

#### Border radius is not working

the child div's overflow can give the impression that the border-radius isn't working.

```css
.todo-body {
    overflow: hidden;
    border-radius: 5px;
}
```

See: [css - border-radius not working - Stack Overflow](https://stackoverflow.com/a/53964887)

#### Theming (dark mode)

It's good practice to make 3 modes for the theming.

- Light mode
- Dark mode
- System - the theme is set by the system.

The `system` choice let users to say: I prefer my OS to be light but to switch to dark mode at night.
The users can switch the theme automatically using the OS setting.

I've created the `data-theme` HTML attribute on the root element to store theme value `auto`, `light` or `dark`. 

```html
<html lang="en" data-theme="auto">
```

By default, the website is in the light mode. When the theme is `auto`, `prefers-color-scheme` detects if the user has chosen light or dark mode in operating system setting. If  the user has chosen the dark mode, the dark styles inside the `@media (prefers-color-scheme: dark)` will be applied.

When the dark theme is turn on, the dark styles inside the `:root[data-theme='dark']` will be applied.

```css
:root {
    // Light mode
    --bg-color: var(--light-bg);
    --text-color: var(--light-text);
    --theme-color: var(--light-theme);
    ...
}

:root[data-theme='auto'] {
    @media (prefers-color-scheme: dark) {
        --bg-color: var(--dark-bg);
        --text-color: var(--dark-text);
        --theme-color: var(--dark-theme);
        ...
    }
}

:root[data-theme='dark'] {
    --bg-color: var(--dark-bg);
    --text-color: var(--dark-text);
    --theme-color: var(--dark-theme);
    ...
```

see: [Your dark mode toggle is broken - Kilian Valkhof](https://kilianvalkhof.com/2020/design/your-dark-mode-toggle-is-broken/)

#### Storing todos in the local storage

The [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) is used to store the data in the web browser. Using local storage means that the data will **not** be cleared even if the page is closed.

The code below stores the todos in the localStorage:

```javascript
const updateLocalStorage = function () {
    // Only strings may be stored in the localStorage,
    // so we need to convert our todos array to a JSON string
    window.localStorage.setItem('todosRef', JSON.stringify(todos));
};
```

When the page is loaded, the function below get todos from the localStorage and render them on the page:

```javascript
const restoreTodos = function () {
    const todosRef = window.localStorage.getItem('todosRef');
    if (todosRef) {
        todos = JSON.parse(todosRef);
        todos.forEach((todo) => {
            updateTodoOnDOM(todo);
        });
    }
};
```

#### Drag And Drop

I created drag and drop feature using [HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API).

The 2 articles below helped me to make sortable to-do list:

[How To Create Drag and Drop Elements with Vanilla JavaScript and HTML - DigitalOcean](https://www.digitalocean.com/community/tutorials/js-drag-and-drop-vanilla-js)

[Make a Sortable List With Draggable Items Using JavaScript - Better Programming](https://betterprogramming.pub/create-a-sortable-list-with-draggable-items-using-javascript-9ef38f96b258)

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

[How to build a Todo List App with JavaScript - Freshman](https://freshman.tech/todo-list/) - This blog post helped me to build a to-do list app using JavaScript. I really liked this tutorial because the author explains why he is using that code.

[Pure CSS Custom Checkbox Style - Modern CSS Solutions](https://moderncss.dev/pure-css-custom-checkbox-style/) - This is an amazing article which helped me customizing the HTML checkbox. I like this tutorial because it was build with modern CSS Grid.
