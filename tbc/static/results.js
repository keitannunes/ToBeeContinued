const idea = sessionStorage.getItem("idea");
document.getElementById("idea").textContent = idea;

const reGenerateTitle = () => {
    document.getElementById("title").textContent = "Loading Title...";
    fetch('https://tobeecontinued.herokuapp.com/tbc/title', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"prompt": idea})
    }).then((rawResponse) => {
        rawResponse.json().then((result) => {
            document.getElementById("title").textContent = result.data;
        });
    });

}

const reGenerateScript = () => {
    document.getElementById("scriptText").textContent = "Loading Story...";
    fetch('https://tobeecontinued.herokuapp.com/tbc/script', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"prompt": idea})
    }).then((rawResponse) => {
        rawResponse.json().then((result) => {
            document.getElementById("scriptText").textContent = result.data;
        });
    });
}

const reGenerateImages = () => {
    for (let i = 0; i < 3; i++) {
        document.getElementById(`img${i}`).src = 'static/loading.png'
    }
    fetch('https://tobeecontinued.herokuapp.com/tbc/images', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"prompt": idea})
    }).then((rawResponse) => {
        rawResponse.json().then((result) => {
            for (let i = 0; i < 3; i++) {
                document.getElementById(`img${i}`).src = result.data[i];
            }
        });
    })
}

reGenerateTitle();
reGenerateScript();
reGenerateImages();
