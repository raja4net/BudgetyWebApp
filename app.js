var budgetController = (function () {
    var Expenses = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value
    };

    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;
            
            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1
            
            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expenses(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            // Push it into our data structure
            data.allItems[type].push(newItem);
            
            // Return the new element
            return newItem;
        }
    };
    
})();

var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'

    }
        return {
                getInput: function () {
                    return {
                        type: document.querySelector(DOMStrings.inputType).value, //in for income and exp for expense
                        description: document.querySelector(DOMStrings.inputDescription).value,
                        value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
                        
                    };
            
                },

                addListItem: function (obj, type) {
                    var html, newHtml, element;
                    if (type === 'inc') {
                        element = DOMStrings.incomeContainer;
                        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                    } else if (type === 'exp') {
                        element = DOMStrings.expensesContainer;
                        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
                    }
                    newHtml = html.replace('%id%', obj.id);
                    newHtml = newHtml.replace('%description%', obj.description);
                    newHtml = newHtml.replace('%value%', obj.value);
                    document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
                },
                
                clearFields: function () {
                    var fields, fieldsArray;
                    fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);
                    fieldsArray = Array.prototype.slice.call(fields);
                    fieldsArray.forEach(function(current, index, array) {
                        current.value = "";
                    });
                    fieldsArray[0].focus();
                },
            
                getDOMstrings: function () {
                return DOMStrings;
                }
        };
    
})();

var controller = (function (budgetCtrl, UICtrl) {
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function (event) {
                if (event.keyCode === 13 || event.which === 13) {
                    ctrlAddItem();
        }
    });
    }
    var ctrlAddItem = function () {
        var input, newItem;
        input = UICtrl.getInput();
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            UICtrl.addListItem(newItem, input.type);
            UICtrl.clearFields();
        }
        
    }
    return {
        init: function () {
            return setupEventListeners();
            
        }
    }
    
})(budgetController, UIController);
controller.init();