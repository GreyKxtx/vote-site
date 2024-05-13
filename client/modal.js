var modal = document.getElementById('myModal');

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function close() {
    modal.style.display = "none";
}

if (!localStorage.getItem('isModalShowed')) {
    modal.style.display = "block";
    localStorage.setItem('isModalShowed', true)
}

document.querySelector('#button-19').addEventListener('click', () => {
    close();
})