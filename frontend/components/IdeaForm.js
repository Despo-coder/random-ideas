import IdeasApi from '../src/services/IdeasApi';
import IdeaList from './IdeaList';

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector('#form-modal');

    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    this._form.addEventListener('submit', this.handleSubmit.bind(this));
    this._form.querySelectorAll('input[name="tag"]').forEach((radio) => {
      radio.addEventListener(
        'change',
        this.handleTagRadioChange.bind(this, radio)
      );
    });
  }

  handleTagRadioChange(selectedRadio) {
    this._form.querySelectorAll('input[name="tag"]').forEach((radio) => {
      if (radio !== selectedRadio) {
        radio.disabled = true;
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (
      !this._form.elements.username.value ||
      !this._form.elements.text.value ||
      !this._form.elements.tag.value
    ) {
      alert('Please enter all fields');
      return;
    }
    //Save user to Local Storage

    localStorage.setItem('username', this._form.elements.username.value);

    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };
    //Add Idea to Server
    const newIdea = await IdeasApi.createIdeas(idea);
    //Add Idea to the List
    this._ideaList.addIdeaToList(newIdea.data.data);
    this._form.reset();
    this.render();
    document.dispatchEvent(new Event('closemodal'));
  }

  render() {
    this._formModal.innerHTML = `
      <form id="idea-form">
        <div class="form-control">
          <label for="username">Enter A UserName</label>
          <input type="text" value="${
            localStorage.getItem('username')
              ? localStorage.getItem('username')
              : ''
          }" name="username" id="username" />
        </div>
 <div class="form-control">
  <label>Heading</label>
  <div class="radio-group">
    <div class="radio-row">
      <label for="business">
        <input type="radio" name="tag" id="business" value="Business">
        <span class="radio-label">Business</span>
      </label>
      <label for="software">
        <input type="radio" name="tag" id="software" value="Software">
        <span class="radio-label">Software</span>
      </label>
    </div>
    <div class="radio-row">
      <label for="education">
        <input type="radio" name="tag" id="education" value="Education">
        <span class="radio-label">Education</span>
      </label>
      <label for="health">
        <input type="radio" name="tag" id="health" value="Health">
        <span class="radio-label">Health</span>
      </label>
    </div>
    <div class="radio-row">
      <label for="inventions">
        <input type="radio" name="tag" id="inventions" value="Inventions">
        <span class="radio-label">Inventions</span>
      </label>
      <label for="other">
        <input type="radio" name="tag" id="other" value="Other">
        <span class="radio-label">Other</span>
      </label>
    </div>
  </div>
</div>


        <div class="form-control">
          <label for="idea-text">Whats your Idea</label>
          <textarea name="text" id="idea-text"></textarea>
        </div>
       
        <button class="btn" type="submit" id="submit">Submit</button>
      </form>
    `;
    this._form = document.querySelector('#idea-form');
    this.addEventListeners();
  }
}

export default IdeaForm;
