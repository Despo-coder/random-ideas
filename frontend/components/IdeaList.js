import Idea from '../../models/Idea';
import IdeasApi from '../src/services/IdeasApi';
class IdeaList {
  constructor() {
    this._ideaList = document.querySelector('#idea-list');
    this._ideaFilter = document.getElementById('filterIdeas');
    this.getIdeas();
    this._validTags = new Set();
    this._validTags.add('technology');
    this._validTags.add('business');
    this._validTags.add('health');
    this._validTags.add('inventions');
    this._validTags.add('software');
    this._validTags.add('other');
    this._ideas = [];

    this._ideaFilter.addEventListener('keyup', this._filterItem.bind(this));
    this._ideaList.addEventListener('click', this._deleteItem.bind(this));
    this._ideaList.addEventListener('click', (event) => {
      const link = event.target.closest('.show-more');
      if (link) {
        event.preventDefault();
        const ideaId = link.getAttribute('data-id');
        this.showIdeaDetails(ideaId);
      }
    });
  }
  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();

      this._ideas = res.data.data;

      this.render();
    } catch (error) {
      console.log(error);
    }
  }
  async deleteIdea(id) {
    try {
      const res = await IdeasApi.deleteIdea(id);
      this._ideas.filter((idea) => idea._id != id);
      this.getIdeas();
    } catch (error) {
      alert('You are unauthorized from deleting this resource');
    }
  }
  async updateIdea(id, data) {
    try {
      const res = await IdeasApi.updateIdea(id, data);
      this.getIdeas();
    } catch (error) {
      alert('You are unauthorized from deleting this resource');
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = '';
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = '';
    }
    return tagClass;
  }

  render() {
    this._ideaList.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const deleteBtn =
          localStorage.getItem('username') === idea.username
            ? ` <button class="delete">
          <i class="fas fa-times"></i>
     </button>`
            : '';
        const words = idea.text.split(' ');
        let text = words.slice(0, 10).join(' ');
        let readMoreLink = '';
        if (words.length > 10) {
          readMoreLink = `<a class="show-more" href="#" data-id="${idea._id}"> Read More..... </a>`;
          // `<a href="api/ideas/${idea._id}">Read More</a>`;
        }

        return `
      <div class="card" data-id="${idea._id}"}>
       ${deleteBtn}
        <h5>${text}</h5>

        <p class="tag ${tagClass}">${idea.tag}</p>
        ${readMoreLink}
        <p>
          Posted on <span class="date">${idea.date}</span> by : 
          <span class="author">${idea.username}</span>
        
        </p>
       Idea ID:  <span class="author">${idea._id}</span>
     
      
      </div>
    `;
      })
      .join('');
  }

  _filterItem(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.card').forEach((card) => {
      const tagElement = card.querySelector('.tag');
      console.log(tagElement);
      if (tagElement) {
        const name = tagElement.textContent;
        if (name.toLowerCase().indexOf(text) !== -1) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      }
    });
  }
  async _deleteItem(e) {
    if (e.target.classList.contains('fa-times')) {
      e.stopPropagation();
      const ideaId = e.target.parentElement.parentElement.dataset.id;
      await this.deleteIdea(ideaId);
    }
  }
  showIdeaDetails(id) {
    const idea = this._ideas.find((i) => i._id === id);
    if (!idea) return;
    const modal = document.createElement('div');
    modal.classList.add('modalEl');
    modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h1>${idea.text}</h1>
      <p class="tag ${this.getTagClass(idea.tag)}">${idea.tag}</p>
    </div>
  `;
    const closeButton = modal.querySelector('.close');
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    document.body.appendChild(modal);
  }
}

export default IdeaList;
