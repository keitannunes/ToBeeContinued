const ideas = sessionStorage.getItem("optionList").split("|");
for (let i = 0; i < 5; i++) {
    document.getElementById(`option${i}`).textContent = ideas[i];
}

const onOptionsSubmit = async () => {
    const radios = document.getElementsByName('option');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            sessionStorage.setItem("idea", ideas[i]);
        }
    }
    location.replace("/tbc/results");
}

const reGenerateIdeas = async () => {
    for (let i = 0; i < 5; i++) {
        document.getElementById(`option${i}`).textContent = "Loading...";
    }
    const keyWords = sessionStorage.getItem('keyWords')
    const rawResponse = await fetch('https://tobeecontinued.herokuapp.com/tbc/ideas', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"prompt": keyWords})
    });
    const content = await rawResponse.json();
    const newIdeas = content.data;
    let ideasStr = "";
    for (let i = 0; i < 5; i++) {
        ideas[i] = newIdeas[i];
        ideasStr += `${ideas[i]}|`
        document.getElementById(`option${i}`).textContent = ideas[i];
    }
    sessionStorage.setItem("optionList", ideasStr);
}