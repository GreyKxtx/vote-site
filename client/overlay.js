// Получаем элементы
const ratingContainer = document.querySelector('.rating-container');
const overlayModal = document.getElementById('Modal'); // Переименованная переменная
const closeBtn = overlayModal.querySelector('.close');

// Функция для открытия модального окна
function openModal() {
    overlayModal.style.display = 'block';
}

// Функция для закрытия модального окна
function closeModal() {
    overlayModal.style.display = 'none';
}

// Добавляем обработчик события для открытия модального окна при клике на контейнер
ratingContainer.addEventListener('click', function(event) {
    if (event.target.closest('.rating-container')) {
        openModal();
    }
});

// Добавляем обработчик события для закрытия модального окна при клике на кнопку закрытия
closeBtn.addEventListener('click', closeModal);

// Добавляем обработчик события для закрытия модального окна при клике вне его
window.addEventListener('click', function(event) {
    if (event.target == overlayModal) {
        closeModal();
    }
});

// JavaScript
document.getElementById('button-20').addEventListener('click', function() {
    // Перенаправляем пользователя на страницу auth.html
    window.location.href = './auth.html';
});
