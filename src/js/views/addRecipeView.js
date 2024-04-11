import View from './View.js';
import icons from '../../img/icons.svg';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _message = 'Recipe uploaded successfully!';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  toggleWindow() {
    this.render(this._generateMarkup);
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerCloseWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {
    const placeholder = `Format: Quantity, Unit, Description`;
    return `
      <div class="upload__column">
      <h3 class="upload__heading">Recipe data</h3>
      <label>Title</label>
      <input placeholder="Recipe title (required)" required name="title" type="text" />
      <label>URL</label>
      <input placeholder="Recipe URL (required)" required name="sourceUrl" type="text" />
      <label>Image URL</label>
      <input placeholder="Image URL (required)" required name="image" type="text" />
      <label>Publisher</label>
      <input placeholder="Publisher name (required)" required name="publisher" type="text" />
      <label>Prep time</label>
      <input value="10" required name="cookingTime" type="number" />
      <label>Servings</label>
      <input value="1" required name="servings" type="number" />
    </div>

    <div class="upload__column">
      <h3 class="upload__heading">Ingredients</h3>
      <label>Ingredient 1</label>
      <input value="0.5, kg, chocolate" placeholder="0.5,kg,Rice" type="text" required name="ingredient-1"
        placeholder="${placeholder}" />
      <label>Ingredient 2</label>
      <input type="text" name="ingredient-2" placeholder="${placeholder}" />
      <label>Ingredient 3</label>
      <input type="text" name="ingredient-3" placeholder="${placeholder}" />
      <label>Ingredient 4</label>
      <input type="text" name="ingredient-4" placeholder="${placeholder}" />
      <label>Ingredient 5</label>
      <input type="text" name="ingredient-5" placeholder="${placeholder}" />
      <label>Ingredient 6</label>
      <input type="text" name="ingredient-6" placeholder="${placeholder}" />
    </div>

    <button class="btn upload__btn">
      <svg>
        <use href="${icons}#icon-upload-cloud"></use>
      </svg>
      <span>Upload</span>
    </button>
    `;
  }
}

export default new AddRecipeView();
