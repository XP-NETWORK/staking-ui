

export const sendData = () => {
    const xhr = new XMLHttpRequest();
const url = "url";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json.email + ", " + json.password);
    }
};

const data = JSON.stringify({"email": "hey@mail.com", "password": "101010"});
xhr.send(data);
}