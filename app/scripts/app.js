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
        template:'<div id="calendar"><div class="header">{{cMonthName}} {{cYear}}</div><table id="days"> <td>Su</td><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td></table><div id="cal-frame"><table class="curr"><tbody></tbody> </table></div></div>',
        scope: {
            monthName: '@',
            yearName: '@'
        },
        link:function(scope, element){
    
            var date = new Date();
            
            
            //setting month captal letter
            if(scope.monthName){ 
                scope.monthName = scope.monthName.charAt(0).toUpperCase() + scope.monthName.slice(1);
            }
            
            //fixing angular directive link problem
            var obj = angular.element.find('.curr tbody');
            for(var i in obj) {
                if(!angular.element(obj[i]).hasClass('dp')) {
                    angular.element(obj[i]).addClass('dp');
                    angular.element(obj[i]).addClass('dp'+scope.$id);   
                    break;
                }
            }
            
            
            function monthNumers(){
                return { 'January':0, 'February':1, 'March':2, 'April':3, 'May':4, 'June':5, 'July':6, 'August':7, 'September':8, 'October':9, 'November':10, 'December':11 };
            }            
            scope.cYear = date.getFullYear();
            
            var monthNumber = monthNumers()[scope.monthName];
            if(monthNumber) { 
                date.setMonth(monthNumber); 
                scope.cMonthName = scope.monthName;
            }
            else { 
                for(var m in monthNumers())
                {
                    if(monthNumers()[m] === date.getMonth()){
                        scope.cMonthName = m; 
                    }
                }
                scope.monthName = date.getMonth();
            }
            
            console.log(date);
            date.setDate(1);
            console.log(scope.monthName);
            
            var month = date.getMonth(),
                templateTd = '<tr>';
            //adding after day td's
            for(var i = date.getUTCDay(); i > 0; i--){
                templateTd+='<td class="nil"></td>';
            }
            //loop for build all days 
            while (date.getMonth() === month) {

                if(date.getUTCDay() === 0){ templateTd +='<tr>'; }//starting week line
                
                var wkd = (date.getUTCDay() === 0 || date.getUTCDay() === 6)? "wkd" : "";
                
                templateTd +='<td class="'+wkd+'">'+date.getDate()+'</td>'; 
                if(date.getUTCDay() === 6){ templateTd +='</tr>'; }//ending week line
                date.setDate(date.getDate() + 1);
            }
            element.parent().find('.curr .dp'+scope.$id).append(templateTd);
        }
    };
});
