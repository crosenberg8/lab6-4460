d3.csv('transportData.csv').then(function (data) {
    /*
    1. Get the data into a varaible
    2. Get the years of the data
    3. Get the max and min number of fatalities
    */
    
   

   //select svg
   var svg = d3.select('svg')

   // height and width
   var height = 700;
   var width = 1200;

   // Title saying "Transportation Fatalities over Time"
    svg.append('text')
        .attr('x', width/2)
        .attr('y', 50)
        .attr('text-anchor', 'middle')
        .attr('font-size', '30px')
        .text('Transportation Fatalities Over Time');
       
    // get the years of the data
    var years = data.map(function (row) {
        return row.Year;
    });

    // create x-scale
    var xscale = d3.scaleBand()
        .domain(years)
        .range([0, width - 150]);

    // create y-scale
    var yscale = d3.scaleLinear()
        .domain([0, 55000])
        .range([height/2 + 100, 0]);

    // create y-axis
    var x_axis = d3.axisBottom()
        .scale(xscale);

    // create y-axis
    var y_axis = d3.axisLeft()
        .scale(yscale);

    // Add the x axis to the svg
    d3.select('svg')
        .append('g')
        .attr('transform', 'translate(100, 600)')
        .call(x_axis);

    // Add the y axis to the svg
    d3.select('svg')
        .append('g')
        .attr('transform', 'translate(100, 150)')
        .call(y_axis);
    
    // x-axis label
    svg.append("text")
        .attr("x", width/2)
        .attr("y", height - 50)
        .style("text-anchor", "middle")
        .text("Year");

    //rotate text
    d3.selectAll('g')
        .selectAll('text')
        .attr('transform', 'translate(-10, 0)rotate(-45)')
        .style('text-anchor', 'end');

    // Add the y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 20)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of Fatalities");

    var year = data.map(function (row) {
        return row.Year;
    });

    var carOccupant = data.map(function (row) {
        return row.Car_Occupant;
    });

    var pedestrian = data.map(function(row) {
        return row.Pedestrian;
    })

    var motorcycle = data.map(function(row) {
        return row.Motorcycle;
    })

    var bicycle = data.map(function(row) {
        return row.Bicycle;
    })

    var trucks = data.map(function(row) {
        return row.Trucks;
    })

    var total = data.map(function(row) {
        return row.Total;
    })

    // check which radio button is selected
    var rawSelected = true;
    
    d3.select('#Raw').on('change', function () {
        if (this.checked) {
            rawSelected = true; 
            if (document.getElementById('Total').checked) {
                undisplayTotalTrend();
                displayTotal();
            }
            if (document.getElementById('Car').checked) {
                undisplayCarTrend();
                displayCar();
            }
            if (document.getElementById('Pedestrian').checked) {
                undisplayPedTrend();
                displayPedestrian();
            }
            if (document.getElementById('Motorcycle').checked) {
                undisplayMotorTrend();
                displayMotorcycle();
            }
            if (document.getElementById('Bicycle').checked) {
                undisplayBicycleTrend();
                displayBicycle();
            }
            if (document.getElementById('Truck').checked) {
                undisplayTruckTrend();
                displayTruck();
            }
        }
    });

    d3.select('#Trend').on('change', function () {
        if (this.checked) {
            rawSelected = false;
            if (document.getElementById('Total').checked) {
                displayTotalTrend();
                undisplayTotal();
            }
            if (document.getElementById('Car').checked) {
                displayCarTrend();
                undisplayCar();
            }
            if (document.getElementById('Pedestrian').checked) {
                displayPedTrend();
                undisplayPedestrian();
            }
            if (document.getElementById('Motorcycle').checked) {
                displayMotorTrend();
                undisplayMotorcycle();
            }
            if (document.getElementById('Bicycle').checked) {
                displayBicycleTrend();
                undisplayBicycle();
            }
            if (document.getElementById('Truck').checked) {
                displayTruckTrend();
                undisplayTruck();
            }
        }
    });

    /*
    If boolean for trendline is selected (all this logic is within teh filters), then plot trendline. Else, plot the raw data.

    */
   


    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Total Filter @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    d3.select('#total').on('change', function () {
        if (rawSelected) {
            this.checked ? displayTotal() : undisplayTotal();
        } else {
            this.checked ? displayTotalTrend() : undisplayTotalTrend();
        }
    });

    //raw data
    function displayTotal() {
        var line = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(total[i]) + 150;
        });

        svg.append('path')
        .attr('d', line(total))
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('class', 'total');  
    }
    
    function undisplayTotal() {
        d3.selectAll('.total').remove();
    }

    //Trend data
    function displayTotalTrend() {

        var Gen = d3.line();
        var points = [
            [xscale(1975) + 100, yscale(48451.5) + 150],
            [xscale(2020) + 100, yscale(34774.2) + 150]
        ];
        var pathOfLine = Gen(points);
  
        svg.append('path')
            .attr('d', pathOfLine)
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', 'totalTrend');
    }

    function undisplayTotalTrend() {
        d3.selectAll('.totalTrend').remove();
    }

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Car Filter @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    d3.select('#car').on('change', function () {
        if (rawSelected) {
            this.checked ? displayCar() : undisplayCar();
        } else {
            this.checked ? displayCarTrend() : undisplayCarTrend();
        }
    });

    //raw data 
    function displayCar() {
        var line = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(carOccupant[i]) + 150;
        }); 

        svg.append('path')
        .attr('d', line(carOccupant))
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('class', 'car');
    }

    function undisplayCar() {
        d3.selectAll('.car').remove();
    }

    //Trend data
    function displayCarTrend() {

        var Gen = d3.line();
        var points = [
            [xscale(1975) + 100, yscale(35038.25) + 150],
            [xscale(2020) + 100, yscale(23618.6) + 150]
        ];
        var pathOfLine = Gen(points);
  
        svg.append('path')
            .attr('d', pathOfLine)
            .attr('stroke', 'red')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', 'carTrend');
    }

    function undisplayCarTrend() {
        d3.selectAll('.carTrend').remove();
    }

    

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Pedestrian Filter @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    d3.select('#pedestrian').on('change', function () {
        if (rawSelected) {
            this.checked ? displayPedestrian() : undisplayPedestrian();
        } else {
            this.checked ? displayPedTrend() : undisplayPedTrend();
        }
    });

    //raw data
    function displayPedestrian() {
        var line = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(pedestrian[i]) + 150;
        });

        svg.append('path')
        .attr('d', line(pedestrian))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('class', 'pedestrian');
    }

    function undisplayPedestrian() {
        d3.selectAll('.pedestrian').remove();
    }

    //Trend data
    function displayPedTrend() {

        var Gen = d3.line();
        var points = [
            [xscale(1975) + 100, yscale(7289.975) + 150],
            [xscale(2020) + 100, yscale(4532.42) + 150]
        ];
        var pathOfLine = Gen(points);
  
        svg.append('path')
            .attr('d', pathOfLine)
            .attr('stroke', 'blue')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', 'pedTrend');
    }

    function undisplayPedTrend() {
        d3.selectAll('.pedTrend').remove();
    }

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Motorcycle Filter @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    d3.select('#motorcycle').on('change', function () {
        if (rawSelected) {
            this.checked ? displayMotorcycle() : undisplayMotorcycle();
        } else {
            this.checked ? displayMotorTrend() : undisplayMotorTrend();
        }
    });

    //raw data
    function displayMotorcycle() {
        var line = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(motorcycle[i]) + 150;
        });

        svg.append('path')
        .attr('d', line(motorcycle))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('class', 'motorcycle');
    }

    function undisplayMotorcycle() {
        d3.selectAll('.motorcycle').remove();
    }

    //Trend data
    function displayMotorTrend() {

        var Gen = d3.line();
        var points = [
            [xscale(1975) + 100, yscale(3283.84) + 150],
            [xscale(2020) + 100, yscale(4471.44) + 150]
        ];
        var pathOfLine = Gen(points);
  
        svg.append('path')
            .attr('d', pathOfLine)
            .attr('stroke', 'green')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', 'motorTrend');
    }

    function undisplayMotorTrend() {
        d3.selectAll('.motorTrend').remove();
    }

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Bicycle Filter @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    d3.select('#bicycle').on('change', function () {
        if (rawSelected) {
            this.checked ? displayBicycle() : undisplayBicycle();
        } else {
            this.checked ? displayBicycleTrend() : undisplayBicycleTrend();
        }
    });

    //raw data
    function displayBicycle() {
        var line = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(bicycle[i]) + 150;
        });

        svg.append('path')
        .attr('d', line(bicycle))
        .attr('stroke', 'magenta')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('class', 'bicycle');
    }

    function undisplayBicycle() {
        d3.selectAll('.bicycle').remove();
    }

    //Trend data
    function displayBicycleTrend() {

        var Gen = d3.line();
        var points = [
            [xscale(1975) + 100, yscale(918.909) + 150],
            [xscale(2020) + 100, yscale(715.894) + 150]
        ];
        var pathOfLine = Gen(points);
  
        svg.append('path')
            .attr('d', pathOfLine)
            .attr('stroke', 'magenta')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', 'bicycleTrend');
    }

    function undisplayBicycleTrend() {
        d3.selectAll('.bicycleTrend').remove();
    }

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Truck Filter @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    d3.select('#truck').on('change', function () {
        if (rawSelected) {
            this.checked ? displayTruck() : undisplayTruck();
        } else {
            this.checked ? displayTruckTrend() : undisplayTruckTrend();
        }
    });

    function displayTruck() {
        var line = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(trucks[i]) + 150;
        });

        svg.append('path')
        .attr('d', line(trucks))
        .attr('stroke', 'orange')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('class', 'truck');
    }
    
    function undisplayTruck() {
        d3.selectAll('.truck').remove();
    }

    //Trend data
    function displayTruckTrend() {

        var Gen = d3.line();
        var points = [
            [xscale(1975) + 100, yscale(1053.1) + 150],
            [xscale(2020) + 100, yscale(496.72) + 150]
        ];
        var pathOfLine = Gen(points);
  
        svg.append('path')
            .attr('d', pathOfLine)
            .attr('stroke', 'orange')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('class', 'truckTrend');
    }

    function undisplayTruckTrend() {
        d3.selectAll('.truckTrend').remove();
    }
});