 var ctx = document.getElementById("ct-chart-product");
ctx.height = 500;
    
    $(function() {
        "use strict";
        // ============================================================== 
        // Product Sales
        // ============================================================== 

        new Chartist.Bar('.ct-chart-product', {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            series: [
                [1750000, 2000000, 2250000, 1300000],
                [200000, 400000, 500000, 300000],
                [100000, 200000, 400000, 600000]
            ]
        }, {
            height: 380,
            maintainAspectRatio: false,
            stackBars: true,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return (value / 10000) + 'k';
                }
            }
        }).on('draw', function(data) {
            if (data.type === 'bar') {
                data.element.attr({
                    style: 'stroke-width: 40px'
                });
            }
        });
    });




    // ============================================================== 
    // Product Category
    // ============================================================== 
    var chart = new Chartist.Pie('.ct-chart-category', {
        series: [30, 30, 60],
        labels: ['Bananas', 'Apples', 'Grapes']
    }, {
        donut: true,
        showLabel: false,
        donutWidth: 40

    });


    chart.on('draw', function(data) {
        if (data.type === 'slice') {
            // Get the total path length in order to use for dash array animation
            var pathLength = data.element._node.getTotalLength();

            // Set a dasharray that matches the path length as prerequisite to animate dashoffset
            data.element.attr({
                'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
            });

            // Create animation definition while also assigning an ID to the animation for later sync usage
            var animationDefinition = {
                'stroke-dashoffset': {
                    id: 'anim' + data.index,
                    dur: 1000,
                    from: -pathLength + 'px',
                    to: '0px',
                    easing: Chartist.Svg.Easing.easeOutQuint,
                    // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                    fill: 'freeze'
                }
            };

            // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
            if (data.index !== 0) {
                animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
            }

            // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
            data.element.attr({
                'stroke-dashoffset': -pathLength + 'px'
            });

            // We can't use guided mode as the animations need to rely on setting begin manually
            // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
            data.element.animate(animationDefinition, false);
        }
    });

    // For the sake of the example we update the chart every time it's created with a delay of 8 seconds
    




    // ============================================================== 
    // Total Revenue
    // ============================================================== 
    Morris.Area({
        element: 'morris_totalrevenue',
        behaveLikeLine: true,
        data: [
            { x: '2016 Q1', y: 0, },
            { x: '2016 Q2', y: 7500, },
            { x: '2017 Q3', y: 15000, },
            { x: '2017 Q4', y: 22500, },
            { x: '2018 Q5', y: 30000, },
            { x: '2018 Q6', y: 40000, }
        ],
        xkey: 'x',
        ykeys: ['y'],
        labels: ['Y'],
        lineColors: ['#668ED2'],
        resize: true

    });



