const runnerList = document.querySelector('#runner-list');

// create element & render runners
function renderRunners(doc){
    var runner = {
        fullName: doc.data().fullName,
        city: doc.data().city,
        number: doc.data().number,
        checkpoints: doc.data().currentCheckpoints && doc.data().currentCheckpoints.length ? doc.data().currentCheckpoints.map(( fields, index ) => {
            if(fields) {
                const { id, ...info } = fields
                return info
            }
            return null
        }).filter(it => !!it): []
    }

    let li = document.createElement('li');

    let fullName = document.createElement('span');
    let city = document.createElement('span');

    li.setAttribute('data-id', doc.id);
  
    fullName.textContent = runner.number + " " + runner.fullName;
    runner.checkpoints.forEach((checkpoint) => {

    var date = new Date(checkpoint.runnerTime);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        city.textContent += " КП " + checkpoint.name + " время: " + formattedTime;
    });

    li.appendChild(fullName);
    li.appendChild(city);


    console.log("appendChild runner")
    runnerList.appendChild(li);
}

db.collection("runner_ref").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log("Fetch document")
        renderRunners(doc)
    });
});
