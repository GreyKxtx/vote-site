const defaultTabId = 'tab1';
let selectedTab = defaultTabId;
let selectedCardSide = 'front';
let elements = [];
let tabs = [];
let user;
let isFirstLoad = true;

const isAuthed = localStorage.getItem('isAuthed') || false;

fetchTabs()
getAllCandidates();

if (localStorage.getItem('isVoted')) {
    setTimeout(() => {
        document.querySelector('#vote-button').click();
    }, 1)
}

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

async function getEl(elementTab) {
    return fetch(`http://tviyvibir.com.ua/api/tabs/${selectedTab}/${elementTab}`, {}).then((el) => el.json())
}

async function showTab(tabId) {
    const sTab = tabs[selectedTab][selectedCardSide];
    document.querySelector(`[data-tab=${tabId}]`).style.display = 'block';
    document.querySelector(`[data-tab=${tabId}]`).style.border = `2px solid ${sTab.color}`
    document.querySelector(`[data-progress=${tabs[selectedTab].front.id}]`).style.backgroundColor = tabs[selectedTab].front.color;
    document.querySelector(`[data-progress=${tabs[selectedTab].back.id}]`).style.backgroundColor = tabs[selectedTab].back.color;

    document.querySelector(`[data-voices=${tabs[selectedTab].front.id}-front]`).innerHTML = (await getEl(tabs[selectedTab].front.id)).voices
    document.querySelector(`[data-voices=${tabs[selectedTab].back.id}-back]`).innerHTML = (await getEl(tabs[selectedTab].back.id)).voices

    document.querySelector('#vote-button .text').innerHTML = `Голосовать за ${sTab.name}`

    if (isFirstLoad) {
        countVoites();
        isFirstLoad = false;
    }
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

function vote() {
    if (localStorage.getItem('isVoted')) {
        return
    }

    const voices = +document.querySelector(`[data-voices=${tabs[selectedTab][selectedCardSide].id}-${selectedCardSide}]`).innerHTML + 1;

    const body = JSON.stringify({
        selectedTab,
        selectedCardSide,
        username: username,
        voices: voices    
    });
    
    try {
        fetch('http://tviyvibir.com.ua/api/vote', {
            method: 'POST',
            body: body,
            headers: new Headers({ "Content-Type": "application/json" })
        }).then(() => {
            setTimeout(() => {
                document.querySelector('#modalSuccess').style.display = 'block';
                localStorage.setItem('isVoted', true);
            }, 3200)
        })
    } catch(err) {
        console.log(err);
    }
}

document.querySelector('#vote-button').addEventListener('click', () => {
    vote();
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
                document.querySelector('#refCount').innerHTML = user && user.refferals || 0;
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
    var increment = end > start ? 5 : -1;
    var stepTime = Math.abs(1);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end || current > end) {
            clearInterval(timer);
        }

        if (increment !== 1 && current > (end - (end * 0.2))) {
            increment = 1;
        }
    }, stepTime);
}

function countVoites() {
    document.querySelectorAll('.count-bar').forEach((bar) => {
        const value = bar.innerHTML;

        if (value <= 0) return;
        bar.innerHTML = 0;
        animateValue(bar, 0, value);
    })
}

const list = document.querySelector("#list");
const listContent = Array.from(list.children);

listContent.forEach(item => {
	const duplicatedItem = item.cloneNode(true);
	duplicatedItem.setAttribute("aria-hidden",true);
	list.appendChild(duplicatedItem);
});


