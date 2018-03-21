var finance = angular.module('nodeFinance', []);

finance.controller('mainController', ($scope, $http) => {
  $scope.formData = {};
  $scope.todoData = {};
  $scope.tableData = {};

  //$scope.sortType = 'contribdate';
  //$scope.sortReverse = false;

  $scope.sort = {
    sortingOrder : 'amnt',
    reverse : false
  };

  $scope.columns = [
    { display: "Date", name: "cdate", sort: "contribdate" },
    { display: "Election", name: "election", sort: "election" },
    { display: "Recipient", name: "recipname", sort: "recipname" },
    { display: "Amount", name: "amnt", sort: "amnt" },
    { display: "Name", name: "name", sort: "name" },
    { display: "Employer", name: "empname", sort: "empname" }
  ]

  // Get all todos
  $http.get('/api/contributions')
  .success((data) => {
    $scope.tableData = data.data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });

});

finance.directive("customSort", function() {
  return {
      restrict: 'A',
      transclude: true,
      scope: {
        order: '=',
        sort: '='
      },
      template :
        ' <a ng-click="sort_by(order)">'+
        '    <span ng-transclude></span>'+
        '    <i ng-class="selectedCls(order)"></i>'+
        '</a>',
      link: function(scope) {

        // change sorting order
        scope.sort_by = function(newSortingOrder) {
            var sort = scope.sort;

            if (sort.sortingOrder == newSortingOrder){
                sort.reverse = !sort.reverse;
            }

            sort.sortingOrder = newSortingOrder;
        };


        scope.selectedCls = function(column) {
            if(column == scope.sort.sortingOrder){
                return ('fa fa-caret-' + ((scope.sort.reverse) ? 'down' : 'up'));
            }
            else{
                return'fa fa-sort'
            }
        }
    }// end link
  }
});