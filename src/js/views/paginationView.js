import icons from '../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _currentPage;

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._currentPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (this._currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next');
    }

    // Last page
    if (this._currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev');
    }

    // Other pages
    if (this._currentPage < numPages) {
      return (
        this._generateMarkupButton('prev') + this._generateMarkupButton('next')
      );
    }

    // Page 1, and there are no other pages
    return '';
  }

  _generateMarkupButton(type) {
    if (type === 'prev')
      return `
        <button data-goto="${
          this._currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._currentPage - 1}</span>
        </button>
  `;

    if (type === 'next')
      return `
        <button data-goto="${
          this._currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${this._currentPage + 1}</span>
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
  `;
  }
}

export default new PaginationView();
