# Tracalorie Web App

This is a web application for tracking calories, created with plain Html, bootstrap and Vanilla JavaScript using OOP.

## It's made of 5 different classes:

1. **CalorieTracker class**

   - this class group all of the calories stuff.
   - have public methods for adding / removing meals and workouts, set the daily calories limit, reset the day, load the meals and workouts from local storage
   - have private methods to render and to display on the DOM the calories stuff.

2. **Meal class**

   - have a constructor with the properties:
     - id
     - name
     - calories

3. **Workout class**

   - have a constructor with the same properties as the meal one.

4. **Storage class**

   - this class have static methods for storing into local storage and get from local storage: calories limit, total calories, meals and workouts.

5. **App class**

   - this is the initializer that have a constructor which initialize the tracker (instance of CalorieTracker class) and have all the event listeners

   - the methods that fires off when those events happens are:

     - \_newItem( )
     - \_removeItem( )
     - \_filterItem( )
     - \_filterItems( )
     - \_reset( )
     - \_setLimit( )

       which calls some of the tracker public methods

This project is from Brad Traversy course: Modern JavaScript From The Beginning 2.0
