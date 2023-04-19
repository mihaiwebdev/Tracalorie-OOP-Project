class CalorieTracker {
    constructor() {
        this._calorieLimit = Storage.getCalorieLimit();
        this._totalCalories = Storage.getTotalCalories(0);
        this._meals = Storage.getMeals();
        this._workouts = Storage.getWorkouts();

        this._displayCaloriesLimit();
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();

        document.getElementById('limit').value = this._calorieLimit
    }

    addMeal(meal) {
        this._meals.push(meal);
        Storage.setMeals(this._meals);   
        Storage.setTotalCalories(this._totalCalories += meal.calories);
        this._displayNewMeal(meal);
        this._render();
    }

    removeMeal(id) {
        const mealToRemove = this._meals.find(meal => meal.id === id);

        if (mealToRemove) {
            Storage.setTotalCalories(this._totalCalories -= mealToRemove.calories);
            this._meals.splice(this._meals.indexOf(mealToRemove), 1);
            Storage.setMeals(this._meals);  
            this._render();
        }
    }

    addWorkout(workout) {
        this._workouts.push(workout);
        Storage.setWorkouts(this._workouts);
        Storage.setTotalCalories(this._totalCalories -= workout.calories);
        this._displayNewWorkout(workout);
        this._render();
    }

    removeWorkout(id) {
        const workoutToRemove = this._workouts.find(workout => workout.id === id);
        
        if (workoutToRemove) {
            Storage.setTotalCalories(this._totalCalories += workoutToRemove.calories);
            this._workouts.splice(this._workouts.indexOf(workoutToRemove), 1);
            Storage.setWorkouts(this._workouts);
            this._render();
        }
    }

    reset() {
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        Storage.clearAll();
        this._render();
    }

    changeLimit(value) {
        this._calorieLimit = value;
        Storage.setCalorieLimit(value);
        this._displayCaloriesLimit();
        this._render();
    }

    
    loadMealsAndWorkouts() {
        this._meals.map(meal => this._displayNewMeal(meal))
        this._workouts.map(workout => this._displayNewWorkout(workout))
    }


    _displayCaloriesTotal() {
        const totalCaloriesEl = document.getElementById('calories-total');
        totalCaloriesEl.innerHTML = this._totalCalories;
    }

    _displayCaloriesLimit() {
        const calorieLimitEl = document.getElementById('calories-limit');
        calorieLimitEl.innerHTML = this._calorieLimit;
    }

    _displayCaloriesConsumed() {
        const caloriesConsumedEl = document.getElementById('calories-consumed');
        const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0);
        caloriesConsumedEl.innerHTML = consumed;
    }

    _displayCaloriesBurned() {
        const caloriesBurnedEl = document.getElementById('calories-burned');
        const burned = this._workouts.reduce((total, workout) => total + workout.calories, 0);
        caloriesBurnedEl.innerHTML = burned;
    }

    _displayCaloriesRemaining() {
        const progressEl = document.getElementById('calorie-progress');
        const caloriesRemainingEl = document.getElementById('calories-remaining');
        const remaining = this._calorieLimit - this._totalCalories;
        caloriesRemainingEl.innerHTML = remaining;

        if (remaining <= 0) {
            caloriesRemainingEl.parentElement.parentElement.className = ('card bg-danger');
            progressEl.className = 'progress-bar bg-danger'
        } else {
            caloriesRemainingEl.parentElement.parentElement.className = ('card bg-light');
            progressEl.className = 'progress-bar'
        }
    }

    _displayCaloriesProgress() {
        const progressEl = document.getElementById('calorie-progress');
        const percentage = (this._totalCalories / this._calorieLimit) * 100;
        const width = Math.min(percentage, 100);
        progressEl.style.width = `${width}%`;
    }

    _displayNewMeal(meal) {
        const mealsEl = document.getElementById('meal-items');
        const mealEl = document.createElement('div');
        mealEl.classList.add('card', 'my-2');
        mealEl.setAttribute('data-id', meal.id);
        mealEl.innerHTML = `
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${meal.name}</h4>
                <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
                    ${meal.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>`;
        mealsEl.appendChild(mealEl);
    }

    _displayNewWorkout(workout) {
        const workoutsEl = document.getElementById('workout-items');
        const workoutEl = document.createElement('div');
        workoutEl.classList.add('card', 'my-2');
        workoutEl.setAttribute('data-id', workout.id);
        workoutEl.innerHTML = `
        <div class="card-body">
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${workout.name}</h4>
                <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
                    ${workout.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
        `;
        workoutsEl.appendChild(workoutEl);
    }

    _render() {
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    }
}


class Meal {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}


class Workout {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}


class Storage {
    static getCalorieLimit(defaultValue = 2000) {
        let calorieLimit;

        if (localStorage.getItem('calorieLimit') === null) {
            calorieLimit = defaultValue

        } else {
            calorieLimit = +localStorage.getItem('calorieLimit');
        }

        return calorieLimit;
    }

    static setCalorieLimit(value) {
        localStorage.setItem('calorieLimit', value);
    }

    static getTotalCalories(defaultValue = 0) {
        let totalCalories;

        if (localStorage.getItem('totalCalories') === null){
            totalCalories = defaultValue;

        } else {
            totalCalories = +localStorage.getItem('totalCalories');
        }

        return totalCalories;
    }

    static setTotalCalories(value) {
        localStorage.setItem('totalCalories', value)
    }

    static getMeals() {
        let meals;

        if (localStorage.getItem('meals') === null) {
            meals = []

        } else {
            meals = JSON.parse(localStorage.getItem('meals'))
            
        }

        return meals;
    }

    static setMeals(value) {
        localStorage.setItem('meals', JSON.stringify(value))
    }

    static getWorkouts() {
        let workouts;

        if (localStorage.getItem('workouts') === null) {
            workouts = [];

        } else {
            workouts = JSON.parse(localStorage.getItem('workouts'))
        }

        return workouts
    }

    static setWorkouts(value) {
        localStorage.setItem('workouts', JSON.stringify(value))
    }

    static clearAll() {
        localStorage.removeItem('totalCalories')
        localStorage.removeItem('meals')
        localStorage.removeItem('workouts')
    }
}


class App {
    constructor() {
        this._tracker = new CalorieTracker();
        this._tracker.loadMealsAndWorkouts();
        this._loadEventListeners();
    }

    _loadEventListeners() {
        document.getElementById('meal-form').addEventListener('submit', this._newItem.bind(this, 'meal'));
        document.getElementById('workout-form').addEventListener('submit', this._newItem.bind(this, 'workout'));

        document.getElementById('meal-items').addEventListener('click', this._removeItem.bind(this, 'meal'));
        document.getElementById('workout-items').addEventListener('click', this._removeItem.bind(this, 'workout'));

        document.getElementById('filter-meals').addEventListener('keyup', this._filterItems.bind(this, 'meal'));
        document.getElementById('filter-workouts').addEventListener('keyup', this._filterItems.bind(this, 'workout'));

        document.getElementById('reset').addEventListener('click', this._reset.bind(this));

        document.getElementById('limit-form').addEventListener('submit', this._changeLimit.bind(this));
    }

    _newItem(type, e) {
        e.preventDefault();

        const name = document.getElementById(`${type}-name`);
        const calories = document.getElementById(`${type}-calories`);

        if (name.value === '' || calories.value === '') {
            alert('Please fill in all fields!');
            return
        }

        if (type === 'meal') {
            const meal = new Meal(name.value, +calories.value);
            this._tracker.addMeal(meal);

        } else {
            const workout = new Workout(name.value, +calories.value);
            this._tracker.addWorkout(workout);
        }

        name.value = '';
        calories.value = '';

        const collapseItem = document.getElementById(`collapse-${type}`);
        const bsCollapse = new bootstrap.Collapse(collapseItem, {
            toggle: true
        });
    }

    _removeItem(type, e) {
        if (e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')) {
            if (confirm(`Are you sure you want to delete this ${type}?`)) {
                const id = e.target.closest('.card').getAttribute('data-id');

                type === 'meal' ? this._tracker.removeMeal(id) : this._tracker.removeWorkout(id);

                e.target.closest('.card').remove();
            }
        }

    }

    _filterItems(type, e) {
        const text = e.target.value.toLowerCase();
        document.querySelectorAll(`#${type}-items .card`).forEach(item => {

            const name = item.firstElementChild.firstElementChild.textContent;

            if (name.toLowerCase().indexOf(text) !== -1) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        })
    }

    _reset() {
        this._tracker.reset();
        document.getElementById('meal-items').innerHTML = '';
        document.getElementById('workout-items').innerHTML = '';
        document.getElementById('filter-meals').value = '';
        document.getElementById('filter-workouts').value = '';
    }

    _changeLimit(e) {
        e.preventDefault();

        const limit = document.getElementById('limit');

        if (limit.value === '') {
            alert('Please set a limit')
            return
        } 

        this._tracker.changeLimit(+limit.value);
        limit.value = '';

        const modalEl = document.getElementById('limit-modal');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
    }
}

const app = new App();