let contacts = [];
let emergencyContact = false;

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
  event.preventDefault();
  const form = event.target;
  const contactName = form.name.value;
  const contactTel = form.tel.value;
  const contactID = generateId();
  console.log(contactName, contactTel, contactID, form.emergency.checked);

  if (form.emergency.checked) {
    emergencyContact = true;
  }
  const currentContact = {
    ID: contactID, name: contactName, tel: contactTel, emergency: emergencyContact,
  };

  contacts.push(currentContact);
  contacts.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  saveContacts();
  form.reset();
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts
 */
function saveContacts() {
  window.localStorage.setItem('contacts', JSON.stringify(contacts));
  drawContacts();
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  const contactsData = JSON.parse(window.localStorage.getItem('contacts'));
  if (contactsData) {
    contacts = contactsData;
  }
}

/**
 * This function targets the contacts-list on the
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */

function drawContacts() {
  let template = '';
  const contactListElement = document.getElementById('contacts');


  contacts.forEach((contact) => {
    template += `
      <div class="card mt-1 mb-1 ${contact.emergency ? 'emergency-contact' : ''}">
        <h3 class="mt-1 mb-1">${contact.name}</h3>
        <div class="d-flex space-between">
          <p>
            <i class="fa fa-fw fa-phone"></i>
            <span>${contact.tel}</span>
          </p>
          <i class="action fa fa-trash text-danger" onclick="removeContact('${contact.ID}')"></i>
        </div>
      </div>
      `;
  });
  contactListElement.innerHTML = template;
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the
 * contact by their id from the list of contacts
 * *** hints:
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId
 */
function removeContact(contactId) {
  console.log(`Removing ${contactId}`);
  const removal = contacts.findIndex((contact) => contact.ID === contactId);
  if (removal == -1) {
    throw new Error("Invalid Contact ID")
  }
  contacts.splice(removal, 1);

  saveContacts();
}


/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  const contactForm = document.getElementById('new-contact-form');
  if (contactForm.style.display === 'none') {
    contactForm.style.display = 'block';
  } else {
    contactForm.style.display = 'none';
  }
  /**
   * In the video, they use the following:
   * document.getElementById('new-contact-form').classList.toggle("hidden");
   */
}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return `${Math.floor(Math.random() * 10000000)}-${Math.floor(Math.random() * 10000000)}`;
}


loadContacts();
drawContacts();
