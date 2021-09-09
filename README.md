# cottagecore

> Vue and Firebase. Deployed at https://naughty-brattain-84d7d4.netlify.app. Warning: unfinished + buggy.

## Interesting features

-   Login + signup via Firebase
-   Username-is-available check before signup, also, some Vuetify form rules (email is invalid, password is too short, etc)
-   Drag+drop planting interface (click on 'My Cottage', then 'Get a seed', then click+drag the chip that appears to one of the 25 'plots'.) The current state of the garden is stored in Firebase.

## What I'd change now

### Sept 2021

-   Better, observable stores, and better implementation.
    -   Put store at lowest file directory that makes sense, instead of all in /store
    -   Observable stores - properties update across the store and the Vue implementation
    -   Pull store directly into component instead of setting local copies where not needed (eg Town/index.vue)
-   Current user saved to store for easier access, and to avoid having to emit from the router component when user changes
-   Finish moving business logic from Vue files to an agnostic JS class - gardenStore.js comes close to this except I hate the props/getters mutations/actions pattern and I want to decouple the logic from the store information and decouple them both from the display portion.
-   Add SO much error handling
-   Design theme and layout and change to that instead of just going by whimsy and getting this garbage
