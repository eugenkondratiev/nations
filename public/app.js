;
const API_HOST = "http://95.158.47.15:3003";
function getNationsBase() {
    ajaxGet("GET", API_HOST + "/ids")
        .then(ids => {
            console.log(JSON.parse(ids).base);

        })
        .catch(errResponse => {console.log(errResponse)});
}
function ajaxGet(method, requestString) {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener("error", () => { rej("xhr error") });
        xhr.addEventListener("abort", () => { rej("xhr aborted") });

        xhr.addEventListener("loadend", function () {
            res(this.responseText);

            // res(xhr.responseText);

        });

        xhr.addEventListener('progress', function (event) {
            if (event.lengthComputable) {
                console.log(`Received ${event.loaded} of ${event.total} bytes`);
            } else {
                console.log(`Received ${event.loaded} bytes totally`); // no Content-Length
            }

        });
        xhr.open(method, requestString);

        xhr.send();
    });

}
window.addEventListener('load', () => {
    getNationsBase();

    async function searchByName() {
        const _name = document.querySelector("#player-name").value;
        console.log('searchByName! ', _name);

        try {
            const resp = await ajaxGet("GET", `${API_HOST}/find?name=${_name}`);
            try {
                const answer = JSON.parse(resp);
                console.log(JSON.stringify(answer));

                const searchTarget = document.getElementById("by-name");
                if (answer.fail) {
                    searchTarget.textContent = answer.fail;
                    return
                }
                searchTarget.innerHTML = answer.map((row, i) => {
                    row.unshift(i+1+". ");
                    row.push("<br>");
                    return row.join("  -   ");
                })
                // answer.forEach((element, i) => {
                //     element.unshift(i+". ");
                //     element.push("\n");
                //     const newRow = document.createTextNode(element);
                //     searchTarget.appendChild(newRow);
                    
                // });
            } catch (error) {
                console.log(error.message);
            }
            
            

        } catch (error) {
            console.log("search error ", error.message)
        }
    }
    async function searchByNation() {
        const _nation = document.querySelector("#nation").value;
        console.log('searchByNation! ', _nation)

        try {
            const resp = await ajaxGet("GET", `${API_HOST}/exot?nation=${_nation}`);
            // console.log(resp);
            try {
                const answer = JSON.parse(resp);
                // console.log(answer);
                // console.log(JSON.stringify(answer));

                const searchTarget = document.getElementById("by-nation");
                if (answer.fail) {
                    searchTarget.textContent = answer.fail;
                    return
                }
                searchTarget.innerHTML = answer.map((row, i) => {
                    row.unshift(i+1+". ");
                    row.push("<br>");
                    return row.join("    -   ");
                })
                // answer.forEach((element, i) => {
                //     element.unshift(i+". ");
                //     element.push("\n");
                //     const newRow = document.createTextNode(element);
                //     searchTarget.appendChild(newRow);
                    
                // });
            } catch (error) {
                console.log(error.message);
            }
        } catch (error) {
            console.log("search error ", error.message);
        }
    }

    document.querySelector("#player-name").addEventListener('change', (e) => {
        e.preventDefault();
        searchByName()
            .then(resp => {
                ;
            })
            .catch(err => console.log(err.message));
    });
    document.querySelector("#player-button").addEventListener('click', (e) => {
        e.preventDefault();
        searchByName()
            .then(resp => {
                ;
            })
            .catch(err => console.log(err.message));
    });
    document.querySelector("#nation-button").addEventListener('click', (e) => {
        e.preventDefault();
        searchByNation()
            .then(resp => {
                ;
            })
            .catch(err => console.log(err.message));
    });
    document.querySelector("#nation").addEventListener('change', (e) => {
        e.preventDefault();
        searchByNation()
            .then(resp => {
                ;
            })
            .catch(err => console.log(err.message));

    });
});

