//Defining functions
var chosenID = 0
var chosenDemographics = 0
var sampleData = 0

//Loading JSON to explore data structure
d3.json('./data/samples.json').then(function(importData){

    //store data
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

    //selected ID
    chosenID = d3.select("#selDataset").property("value");
    console.log(chosenID);

    //Demographic Data
    data.metadata.forEach(i => {

        //find sample id
        if(parseInt(i.id) === parseInt(chosenID)){
            chosenDemographics = i;
            console.log(chosenDemographics);

            //Assign info to demographics panel
            var DemographicData = d3.select("#sample-metadata");

            Object.entries(chosenDemographics).forEach(([key, value]) => {
                console.log(`${key.toUpperCase()}: ${value}`)

                DemographicData.append('p')
                .text(`${key.toUpperCase()}: ${value}`)
            });
        }
    });

    //Create charts
    data.samples.forEach(i => {

        //find sample ID
        if(parseInt(i.id) === parseInt(chosenID)){

            sampleData = i 
            console.log(sampleData)

        }

    })


});
