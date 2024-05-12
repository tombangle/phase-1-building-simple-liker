window.onload = () => {
  const modal = document.createElement(`div`);
  modal.id = `modal`;
  modal.className = `hidden`;
  const modalMessage = document.createElement(`div`);
  modalMessage.id = `modal-message`;
  modal.appendChild(modalMessage);
  document.body.appendChild(modal);
};
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

function toggleHeart(heartElement) {
  if (heartElement.textContent === EMPTY_HEART) {
    mimicServerCall()
    .then(() => {
      heartElement.textContent = FULL_HEART;
      heartElement.classList.add(`activated-heart`);
      })
      .catch((error) => {
        const modal = document.getElementById(`modal`);
        const modalMessage = document.getElementById(`modal-message`);
        modal.classList.remove(`hidden`);
        modalMessage.textContent = error;
        setTimeout(() => {
          modal.classList.add(`hidden`);
        }, 3000);
      });
  } else {
    heartElement.textContent = EMPTY_HEART;
    heartElement.classList.remove(`activated-heart`);
  }
}

document.querySelectorAll(`.heart`).forEach(heart => {
  heart.addEventListener(`click`,() => toggleHeart(heart));
})

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < 0.2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
