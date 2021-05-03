
class Cardgrid {
  constructor(elementItem, grid, buttons){
    this.buttons = buttons;
    this.buttonList = document.querySelector(this.buttons);
    this.grid = grid;
    this.elementItem = elementItem;
    this.iso = this._initGrid();
    this._initGrid();
    this._addFilters(this.iso);
    this._radioButtonGroup();
  }


  _initGrid(){
     return new Isotope( this.grid, {
      itemSelector: this.elementItem,
      layoutMode: 'fitRows'
    });
  }

  _addFilters(iso){
      this.buttonList.addEventListener( 'click', function( event ) {
        if ( !matchesSelector( event.target, 'button' ) ) {
          return;
        }
        let filterValue = event.target.getAttribute('data-filter');
        iso.arrange({ filter: filterValue });
      });
  }

  _radioButtonGroup(){
    this.buttonList.addEventListener( 'click', function( event ) {
      if ( !matchesSelector( event.target, 'button' ) ) {
        return;
      }

      this.querySelector('.is-checked').classList.remove('is-checked');
      event.target.classList.add('is-checked');
    });
  }
}

const first = new Cardgrid(".element-item", ".grid", ".button-group");
const second = new Cardgrid(".element-item-two", ".grid-two", ".button-group-two");
