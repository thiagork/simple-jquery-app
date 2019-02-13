let programWrapper = (() => {
    let $searchDescription = 'node';
    let $searchLocation = 'hamburg';
    let apiUrl = 'https://cors.io/?https://jobs.github.com/positions.json?description=python&location=new+york';
    let searchResults = [];
    
    
    // Runs the code
    main();
    
    function makeRequest(url) {
        // Async function (returns promise)
        return $.ajax(url);
    }
    
    function getAll() {
        return searchResults;
    }
    
    function add(item) {
        searchResults.push(item);
    }    
    
    function addListItem(item) {
        
        let $newListItem = $('<li class="item-list__item"></li>');
        $('.item-list').append($newListItem);
        
        let $newButtonInsideListItem = $(`<button class="item-list__item__button" id="${item.id}">${item.title}</button>`).on('click', showModal(item.id));
        $('.item-list__item:last-child').append($newButtonInsideListItem);
    }
    
    function loadList(responseFromAPI) {
        responseFromAPI.forEach(item => {
            let data = {
                id: item.id,
                company: item.company,
                location: item.location,
                title: item.title,
                description: item.description,
                type: item.type,
                positionUrl: item.url,
                dateOfCreation: item.created_at
            };
            add(data);
        })
    }

    function populatePageWithList () {
        getAll().forEach(item => {
            addListItem(item);
        });
    }

    function replaceSpaces(string) {
        return string.replace(/\s+/g, '+')
    }
    
    function showDetails(item) {
        
    }

    function createModalWithDetails(responseFromAPI) {
        
    }
    
    function showModal(title, text) {
        
        
    }
    
    function hideModal(resolveOrReject=null) {
        
    }
    
    function showDialog(title, text, resolve, reject) {
        
    }
    
    function main () {
        makeRequest(apiUrl).then(
            // Executes all the functions that depend on that request
            responseFromAPI => {
                loadList(responseFromAPI);
                populatePageWithList();
            }
        );
    }
    
    
    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
        loadList: loadList,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal,
        showDialog: showDialog,
        main: main,
        replaceSpaces: replaceSpaces
    };
}) ();