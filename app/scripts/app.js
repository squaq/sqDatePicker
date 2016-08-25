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
        template:
        '<div id="calendar">'+
        
        '<div class="header">{{cMonthName}} {{cYear}}</div>'+
        '<div id="dpControllers">'+
            '<button type="button" class="btn btn-default " ng-click="rwd()"><</button>'+
            '<button type="button" class="btn btn-default pull-right" ng-click="fwd()">></button>'+
        '</div>'+        
        '<table id="days">'+
            '<td>Su</td><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td></table><div id="cal-frame">'+
        '<table class="curr"><tbody></tbody> </table>'+
        '</div>'+
        '</div>',
        scope: {
            monthName: '@',
            year: '@',
            date:'@'
        },
        link:function(scope, element){
            
            function init(){
               scope.date = new Date();
                
                //checking if exists "year" setted up in the tag
                if(scope.year){
                    scope.cYear = scope.year;
                }else{
                    scope.cYear = scope.date.getUTCFullYear();
                }

                //setting month captal letter
                if(scope.monthName){ 
                    scope.monthName = scope.monthName.charAt(0).toUpperCase() + scope.monthName.slice(1);
                }
                
                //checking if exists monthName setted up in the tag
                var mn = monthNames().indexOf(scope.monthName);
                if(mn === -1){
                    mn = scope.date.getMonth();
                }

                setDates(mn);
                createCalendar();
            }
                
            function createCalendar() {
                //fixing angular directive link problem
                var obj = angular.element.find('.curr tbody');
                for(var i in obj) {
                    if(!angular.element(obj[i]).hasClass('dp')) {
                        angular.element(obj[i]).addClass('dp');
                        angular.element(obj[i]).addClass('dp'+scope.$id);   
                        break;
                    }
                }
                
                scope.date.setDate(1);
                
                var month = scope.date.getMonth(),
                    templateTd = '<tr>';
                //adding after day td's
                for(var i = scope.date.getUTCDay(); i > 0; i--){
                    templateTd+='<td class="nil"></td>';
                }
                //loop for build all days 
                while (scope.date.getMonth() === month) {

                    if(scope.date.getUTCDay() === 0){ templateTd +='<tr>'; }//starting week line

                    var wkd = (scope.date.getUTCDay() === 0 || scope.date.getUTCDay() === 6)? "wkd" : "";

                    templateTd +='<td class="'+wkd+'">'+scope.date.getDate()+'</td>'; 
                    if(scope.date.getUTCDay() === 6){ templateTd +='</tr>'; }//ending week line
                    scope.date.setDate(scope.date.getDate() + 1);
                }
                element.parent().find('.curr .dp'+scope.$id).append(templateTd);            }
            
            
            
            function monthNames(){
                return [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            }
            
            
            function setDates(monthNumber){
                scope.monthName = scope.cMonthName = monthNames()[monthNumber];
                scope.date.setUTCFullYear(scope.cYear);
                scope.date.setMonth(monthNumber);
                scope.date.setDate(1);
            }
            
            
            function resetCalendar(){
                setDates(scope.date.getMonth());
                element.parent().find('.curr .dp'+scope.$id+' tr').remove();
                element.parent().find('.curr .dp'+scope.$id).removeClass('dp');
                element.parent().find('.curr .dp'+scope.$id).removeClass('dp'+scope.$id);
                createCalendar();
            }
            
            //forward click button action set next month
            scope.fwd = function(){
                scope.date.setUTCMonth(monthNames().indexOf(scope.cMonthName)+1);
                if(scope.date.getUTCMonth() === 0){
                    scope.date.setFullYear(scope.cYear+1);
                    scope.cYear = scope.date.getFullYear();
                }
                resetCalendar();
            }
            
            //reward click button action set last month
            scope.rwd = function(){
                scope.date.setUTCMonth(monthNames().indexOf(scope.cMonthName)-1);
                if(scope.date.getUTCMonth() === 11){
                    scope.date.setFullYear(scope.cYear-1);
                    scope.cYear = scope.date.getFullYear();
                }
                resetCalendar();
            }
            
            init();
        }
    };
});
