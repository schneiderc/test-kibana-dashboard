$(document).ready(function() {
    let today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    $("#from").val(strfdate( yesterday ));
    $("#to").val(strfdate( today ));
});

function strfdate(date) {
    return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
}

function setDateRange() {

    require(['node_modules/rison/js/rison'], function (rison) {
        let baseUrl = "http://localhost:5601/app/kibana#/dashboard/f4433930-573c-11e7-afc4-e330a80b37c6";

        let query = $('#query').val();

        let fromDate =  new Date($("#from").val());
        let toDate =  new Date($("#to").val());

        fromDate.setDate(fromDate.getDate() - 1);
        toDate.setDate(toDate.getDate() - 1);

        let from = strfdate(fromDate);
        let to = strfdate(toDate);
        query = query.length > 0 ? query : '*';

        /*risonParams = {
            _g: {
                refreshInterval:{
                    display: "Off",
                    pause:   false,
                    value:   0
                },
                time:{
                    from: from + "T22:00:00.000Z",
                    mode: "absolute",
                    to: to + "T21:59:59.999Z"
                }
            },
            _a: {
                filters: [],
                options: {
                    darkTheme: false
                },
                panels:[{
                    col:1,
                    id: '716d9040-568e-11e7-b497-1b004262bd85',
                    panelIndex:1,
                    row:4,
                    size_x:6,
                    size_y:5,
                    type: "visualization"
                },{
                    col:7,
                    id: 'd47cfc60-5676-11e7-a1a6-a9d04ed82ec4',
                    panelIndex:2,
                    row:1,
                    size_x:6,
                    size_y:8,
                    type: "visualization"
                },{
                    col:1,
                    id: '955db490-573c-11e7-afc4-e330a80b37c6',
                    panelIndex:3,
                    row:1,
                    size_x:6,
                    size_y:3,
                    type: "visualization"
                }],
                query:{
                    query_string:{
                        analyze_wildcard: true,
                            query: query
                    }
                },
                timeRestore: false,
                title:'Snapshot:+Cloud+Management',
                uiState:{
                    "P-1":{
                        vis:{
                            params:{
                                sort:{
                                    columnIndex:2,
                                        direction:null
                                }
                            }
                        }
                    }
                },
                viewMode:"view"
            }
        };*/

        risonParams = {
            _g: {
                refreshInterval:{
                    display: "Off",
                    pause:   false,
                    value:   0
                },
                time:{
                    from: from + "T22:00:00.000Z",
                    mode: "absolute",
                    to: to + "T21:59:59.999Z"
                }
            }
        };

        let queryParams = "?embed=true";

        for(let rParam in risonParams) {
            if(risonParams.hasOwnProperty(rParam)) {
                queryParams += "&" + rison.encode(risonParams[rParam]);
            }
        }

        let url = baseUrl + queryParams;

        $('.dashboard').attr('src', url);
        console.log(url);
    });
}