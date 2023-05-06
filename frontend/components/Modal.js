class Modal {
  constructor() {
    this._modal = document.querySelector('.modal');
    this._modalBtn = document.getElementById('modal-btn');
    this.addEventListeners();
    document.addEventListener('closemodal', () => this.close());
  }

  addEventListeners() {
    this._modalBtn.addEventListener('click', this.open.bind(this));
    window.addEventListener('click', this.outsideClick.bind(this));
  }

  open = () => {
    this._modal.style.display = 'block';
  };

  close() {
    // location.reload();
    this._modal.style.display = 'none';
  }

  outsideClick = (e) => {
    if (e.target === this._modal) {
      this.close();
    }
  };
}

export default Modal;
