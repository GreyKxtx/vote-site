const defaultTabId = 'tab1';
let selectedTab = defaultTabId;
let selectedCardSide = 'front';
let elements = [];
let tabs = [];
let user;

const isAuthed = localStorage.getItem('isAuthed') || false;

fetchTabs()
getAllCandidates();

document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', (event) => {
        selectedTab = event.target.id;
        hideTabs();
        showTab(selectedTab);

        countVoites();
    })
})

function hideTabs() {
    document.querySelectorAll('[data-tab]').forEach((tab) => tab.style.display = 'none');
}

function showTab(tabId) {
    const sTab = tabs[selectedTab][selectedCardSide];
    document.querySelector(`[data-tab=${tabId}]`).style.display = 'block';
    document.querySelector(`[data-tab=${tabId}]`).style.border = `2px solid ${sTab.color}`
    document.querySelector(`[data-progress=${tabs[selectedTab].front.id}]`).style.backgroundColor = tabs[selectedTab].front.color;
    document.querySelector(`[data-progress=${tabs[selectedTab].back.id}]`).style.backgroundColor = tabs[selectedTab].back.color;
    document.querySelector('#vote-button .text').innerHTML = `Голосовать за ${sTab.name}`
}

if (isAuthed) {
    document.querySelector('#auth-button').style.display = 'none';
    document.querySelector('#vote-button').style.display = 'block';
} else {
    document.querySelector('#auth-button').style.display = 'block';
    document.querySelector('#vote-button').style.display = 'none';
}

const username = localStorage.getItem('username');
if (username) {
    document.querySelector('#refferal').style.display = 'block';
    document.querySelector('#username').innerHTML = username;
    
    const link = `http://tviyvibir.com.ua/api/refLink?username=${username}`
    document.querySelector('#copy_field').value = link;

    getUser()
} else {
    document.querySelector('#refferal').style.display = 'none';
}

document.querySelector('#vote-button').addEventListener('click', () => {
    const body = JSON.stringify({
        selectedTab,
        selectedCardSide,
        username: username      
    });
    
    try {
        fetch('http://tviyvibir.com.ua/api/vote', {
            method: 'POST',
            body: body,
            headers: new Headers({ "Content-Type": "application/json" })
        }).then(() => {
            setTimeout(() => {
                document.querySelector('#modalSuccess').style.display = 'block';
            }, 3200)
        })
    } catch(err) {
        console.log(err);
    }
})

function getAllCandidates() {
    fetch('http://tviyvibir.com.ua/api/vote', {
        method: 'GET'
    }).then((elements) => {
        elements = elements;
    })
}

function getUser() {
    try {
        fetch(`http://tviyvibir.com.ua/api/user?username=${username}`, {
            method: 'GET'
        })
        .then(async (user) => {
            if (user) {
                user = await user.json();
                user = user[0];
                console.log(user);
                document.querySelector('#refCount').innerHTML = user.refferals || 0;
            }
        })
    }
    catch(err) {
        console.log(err);
    }
}

async function fetchTabs() {
    let response = await fetch('http://tviyvibir.com.ua/api/tabs', {
        method: 'GET'
    })
    
    response = await response.json();
    tabs = response;
    showTab(selectedTab || defaultTabId);
}

function myFunction() {
    var copyText = document.getElementById("copy_field");
    copyText.select();
    document.execCommand("copy");
    
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied!"
  }
  
  function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
  }

document.querySelectorAll('.modal-button').forEach((b) => {
    b.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach((m) => m.style.display = 'none');
    })
})

function animateValue(obj, start, end, duration) {
    if (start === end) return;
    var range = end - start;
    var current = start;
    var increment = end > start ? 10 : -1;
    var stepTime = Math.abs(1);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end || current > end) {
            clearInterval(timer);
        }
    }, stepTime);
}

function countVoites() {
    document.querySelectorAll('.count-bar').forEach((bar) => {
        const value = bar.innerHTML;
        bar.innerHTML = 0;
        animateValue(bar, 0, value);
    })
}

countVoites();