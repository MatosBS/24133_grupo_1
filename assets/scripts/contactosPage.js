import { contactoPageElements } from './dom.js';
import { emailHandleKeyUp, inputFieldsHandleKeyUp, dropdownHandleKeyUp, validateForm } from './events.js';

contactoPageElements.nombreYApellido.addEventListener("keyup", inputFieldsHandleKeyUp);
contactoPageElements.mail.addEventListener("keyup", inputFieldsHandleKeyUp);
contactoPageElements.mail.addEventListener("keyup", emailHandleKeyUp);
contactoPageElements.telefono.addEventListener("keyup", inputFieldsHandleKeyUp);
contactoPageElements.motivo.addEventListener("change", dropdownHandleKeyUp);
contactoPageElements.comentarios.addEventListener("keyup", inputFieldsHandleKeyUp);
contactoPageElements.form.addEventListener("submit", validateForm)