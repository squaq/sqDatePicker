'use strict';

/**
 * @ngdoc overview
 * @name sqDatePickerApp
 * @description
 * # sqDatePickerApp
 *
 * Main module of the application.
 */
angular.module('sqDatePickerApp', [])
.directive('dtPicker', function(){
    return {
        restrict : 'E',
        template:'<div id="calendar"><div class="header">{{cMonthName}}</div><table id="days"> <td>sun</td><td>mon</td><td>tue</td><td>wed</td><td>thu</td><td>fri</td><td>sat</td></table><div id="cal-frame"><table class="curr"><tbody></tbody> </table></div></div>',
        scope: {
            monthName: "@",
        },
        link:function($scope, element, attrs){
            var date = new Date();
            
            //setting month captal letter
            if($scope.monthName){ 
                $scope.monthName = $scope.monthName.charAt(0).toUpperCase() + $scope.monthName.slice(1);
            }
            
            var monthNumber = monthNumers()[$scope.monthName];
            if(monthNumber) { 
                date.setMonth(monthNumber); 
                $scope.cMonthName = $scope.monthName;
            }
            else { 
                for(var m in monthNumers())
                {
                    if(monthNumers()[m] === date.getMonth()){
                        $scope.cMonthName = m; 
                    }
                }
                $scope.monthName = date.getMonth();
            }
//            console.log('monthNumber',monthNumber);
            
            
            console.log(date);
            date.setDate(1);
            console.log($scope.monthName)
            
            
            
//            element.parent().find('.curr tbody').append('<h1>é aqui!</h1>');
//            element.parent().find('.curr tbody h1').remove();
//            console.log(element.parent().find('.curr tbody'))
            var month = date.getMonth(),
                mondays = [],
                templateTd = '<tr>';
            //adding after day td's
            for(var i = date.getUTCDay(); i > 0; i--){
                templateTd+='<td class="nil"></td>';
            }
            //loop for build all days 
            while (date.getMonth() === month) {
//                console.log(date.getUTCDay());
                if(date.getUTCDay() === 0){ templateTd +='<tr>'; }//starting week line
                templateTd +='<td>'+date.getDate()+'</td>'; 
                if(date.getUTCDay() === 6){ templateTd +='</tr>'; }//ending week line
                date.setDate(date.getDate() + 1);
//                date.setDate(date.getDate() + 7);
                
            }
            element.parent().find('.curr tbody').append(templateTd);
//            console.log(templateTd);
        }
    };
    
    function monthNumers(){
        return { 'January':0, 'February':1, 'March':2, 'April':3, 'May':4, 'June':5, 'July':6, 'August':7, 'September':8, 'October':9, 'November':10, 'December':11 };
    }
    function weekDays(){
        return['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    }
});