/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to modify data? (update action, delete action)

*/

//localStorage functions
var createItem = function (key, value) {
    return window.localStorage.setItem(key, value);
}

var updateItem = function (key, value) {
    return window.localStorage.setItem(key, value);
}

var deleteItem = function (key) {
    return window.localStorage.removeItem(key);
}

var clearDatabase = function () {
    return window.localStorage.clear();
}

var showDatabaseContents = function () {
    console.log('show database contents', window.localStorage.length)
    $('tbody').html('');

    for (var i = 0; i < window.localStorage.length; i++) {
        var key = window.localStorage.key(i);
        $('tbody').append(`<tr><td>${key}</td><td>${window.localStorage.getItem(key)}</td></tr>`)
    }
}

var keyExists = function (key) {
    return window.localStorage.getItem(key) !== null
}

var getKeyInput = function () {
    return $('.key').val();
}

var getValueInput = function () {
    return $('.value').val();
}


var resetInputs = function () {
    $('.key').val('');
    $('.value').val('');
}


$('.create').click(function () {
    if (getKeyInput() !== '' && getValueInput() !== '') {
        if (keyExists(getKeyInput())) {
            if (confirm('key already exists in database, do you want to update instead?')) {
                updateItem(getKeyInput(), getValueInput());
                showDatabaseContents();
            }
        } else {
            createItem(getKeyInput(), getValueInput());
            showDatabaseContents();
            resetInputs();
        }
    } else {
        alert('key and value must not be blank');
    }
});

$('.update').click(function () {
    if (getKeyInput() !== '' && getValueInput() !== '') {
        if (keyExists(getKeyInput())) {
            updateItem(getKeyInput(), getValueInput());
            showDatabaseContents();
            resetInputs();
        } else {
            alert('key does not exist in database');
        }
    } else {
        alert('key and value must not be blank');
    }
});

$('.delete').click(function () {
    if (getKeyInput() !== '') {
        if (keyExists(getKeyInput())) {
            deleteItem(getKeyInput());
            showDatabaseContents();
            resetInputs();
        } else {
            alert('key does not exist in database');
        }
    } else {
        alert('key must not be blank');
    }
});

$('.reset').click(function () {
    resetInputs();
})

$('.clear').click(function () {
    if (confirm('WARNING: Are you sure you want to clear the database? \n                THIS ACTION CANNOT BE UNDONE')) {
        clearDatabase();
        showDatabaseContents();
    }
})