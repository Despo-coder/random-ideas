import './style/styles.css';
import Modal from '../components/Modal';
import IdeaForm from '../components/IdeaForm';
import IdeaList from '../components/IdeaList';
//import '@fortawesome/fontawesome-free/css/all.css';

new Modal();
const ideaForm = new IdeaForm();
new IdeaList();
ideaForm.render();
