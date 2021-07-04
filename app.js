////////////////////////////////////////////////////////////

//Defining functions & variables

//Chosen ID value function
function findChosenID(){
    return d3.select("#selDataset").property("value");
}

//Create Demographics Data Table Function
function updateDemographics(data){
    //find data for selected ID
    data.metadata.forEach(i => {
        if(parseInt(i.id) === parseInt(findChosenID())){
            var chosenDemographics = i;
            //Assign data to Demographics table
            var DemographicData = d3.select("#sample-metadata");
            DemographicData.html("") //empy table
            Object.entries(chosenDemographics).forEach(([key, value]) => {
                DemographicData.append('p')
                .text(`${key.toUpperCase()}: ${value}`)
            });
        }
    });
}

//Create Top 10 found bacteria Chart
function updateTop10Chart(data){
    //find data for chosen ID sample
    data.samples.forEach(i => {
        if(parseInt(i.id) === parseInt(findChosenID())){
            var sampleData = i;
            console.log(sampleData)
        }
    })
}


//Event handler function (update all tables/charts on selected ID change)
function changeHandler(){
    d3.json('./data/samples.json').then(function(importData){
        var data = importData;
        updateDemographics(data);
        updateTop10Chart(data);
    })
}

////////////////////////////////////////////////////////////
//initiate App

d3.json('./data/samples.json').then(function(importData){
    var data = importData;
    console.log(data);

    //get subject ids and assign them to selector
    var subjectIds = data.metadata.map(i => i.id);
    IdSelector = d3.select("#selDataset");
    subjectIds.forEach(id => {
        IdSelector.append('option')
        .text(id)
        .attr('value', id);
    });

    //Assign table & graphs
    updateDemographics(data);
    updateTop10Chart(data);

});

////////////////////////////////////////////////////////////
//Observe changes

d3.selectAll('#selDataset').on('change', changeHandler);