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
    
    const link = `http://localhost:3000/api/refLink?username=${username}`
    document.querySelector('#copy_field').value = link;

    getUser()
} else {
    document.querySelector('#refferal').style.display = 'none';
}

document.querySelector('#vote-button').addEventListener('click', () => {
    const body = JSON.stringify({
        selectedTab,
        selectedCardSide        
    });
    
    try {
        fetch('http://localhost:3000/api/vote', {
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
    fetch('http://localhost:3000/api/vote', {
        method: 'GET'
    }).then((elements) => {
        elements = elements;
    })
}

function getUser() {
    try {
        fetch(`http://localhost:3000/api/user?username=${username}`, {
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
    let response = await fetch('http://localhost:3000/api/tabs', {
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