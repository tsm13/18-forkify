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

  ///
  // addHandlerRender(handler) {
  //   this._btnOpen.addEventListener('click', handler);
  // }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this.render(this._generateMarkup);
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
      this._data = data;
    });
  }

  _generateMarkup() {
    const placeholder = `Format: Quantity, Unit, Description`;
    return `
      <div class="upload__column">
      <h3 class="upload__heading">Recipe data</h3>
      <label>Title</label>
      <input value="${
        this._data.title ? this._data.title : ''
      }" placeholder="Recipe title (required)" required name="title" type="text" />
      <label>URL</label>
      <input value="${
        this._data.sourceUrl ? this._data.sourceUrl : ''
      }" placeholder="Recipe URL (required)" required name="sourceUrl" type="text" />
      <label>Image URL</label>
      <input value="${
        this._data.image ? this._data.image : ''
      }" placeholder="Image URL (required)" required name="image" type="text" />
      <label>Publisher</label>
      <input value="${
        this._data.publisher ? this._data.publisher : ''
      }" placeholder="Publisher name (required)" required name="publisher" type="text" />
      <label>Prep time</label>
      <input value="10" required name="cookingTime" type="number" />
      <label>Servings</label>
      <input value="1" required name="servings" type="number" />
    </div>

    <div class="upload__column">
      <h3 class="upload__heading">Ingredients</h3>
      <label>Ingredient 1</label>
      <input value="${
        this._data['ingredient-1']
          ? this._data['ingredient-1']
          : '0.5, kg, chocolate'
      }" placeholder="${placeholder}" type="text" required name="ingredient-1"
        placeholder="${placeholder}" />
      <label>Ingredient 2</label>
      <input value="${
        this._data['ingredient-2'] ? this._data['ingredient-2'] : ''
      }" type="text" name="ingredient-2" placeholder="${placeholder}" />
      <label>Ingredient 3</label>
      <input value="${
        this._data['ingredient-3'] ? this._data['ingredient-3'] : ''
      }" type="text" name="ingredient-3" placeholder="${placeholder}" />
      <label>Ingredient 4</label>
      <input value="${
        this._data['ingredient-4'] ? this._data['ingredient-4'] : ''
      }" type="text" name="ingredient-4" placeholder="${placeholder}" />
      <label>Ingredient 5</label>
      <input value="${
        this._data['ingredient-5'] ? this._data['ingredient-5'] : ''
      }" type="text" name="ingredient-5" placeholder="${placeholder}" />
      <label>Ingredient 6</label>
      <input value="${
        this._data['ingredient-6'] ? this._data['ingredient-6'] : ''
      }" type="text" name="ingredient-6" placeholder="${placeholder}" />
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
