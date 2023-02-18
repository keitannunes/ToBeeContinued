if (typeof(sessionStorage.getItem("keyWords")) !== 'undefined') {
    document.getElementById("keywords-input").value = sessionStorage.getItem("keyWords"); 
}

const input = document.getElementById("keywords-input");
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("input-submit").click();
    }
  }); 

const onHomeSubmit = async () => {
    document.getElementById("input-submit").textContent = "Loading..."; 
    const keyWords = document.getElementById("keywords-input").value;
    const rawResponse = await fetch('https://tobeecontinued.herokuapp.com/tbc/ideas', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"prompt" : keyWords})
  });
    const content = await rawResponse.json();
    const ideas = content.data;
    let ideasStr = "";
    for (let i in ideas) {
        ideasStr += `${ideas[i]}|`
    }
    sessionStorage.setItem("optionList", ideasStr);
    sessionStorage.setItem("keyWords", keyWords);
    
    location.replace("/tbc/options");
}
