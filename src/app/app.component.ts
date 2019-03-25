import { Component } from '@angular/core';
import { CarsInfoService } from './cars-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-list-of-cars';
  carModelShowList: any[];

  constructor(private carInfoService: CarsInfoService) {
    this.getCarDisplayList();

  }

  /* 
    Method to get list of values from the API , modify and prepare the data for display in the front end
  */
  getCarDisplayList() {

    //get data 
    this.carInfoService.getCarInormationList().subscribe(response => {
      var carMakeArray = [];
      //function to group the data by a property
      function groupBy(objectArray, property, show) {
        return objectArray.reduce(function (acc, obj) {
    
          var key = obj[property];
    
          if (!acc[key]) {
            acc[key] = [];
          }
    
          let model = obj['model'];
          acc[key].push({ model, show });
          return acc;
        }, {});
      }
      //arranging in a hierarchical manner with cars on the top
      response.forEach(function (show) {
        carMakeArray.push(groupBy(show['cars'], 'make', show['name']));
      });

      //make a new JSON object with the cars being mapped together with their models and shows they attended.
      var uniqueList = carMakeArray.reduce(function (r, e) {
        return Object.keys(e).forEach(function (k) {
          if (!r[k]) r[k] = [].concat(e[k])
          else r[k] = r[k].concat(e[k])
          if (r[k].length > 1) {
            r[k] = Object.values(r[k].reduce((c, { model, show }) => {
              c[model] = c[model] || { model, show: [] };
              c[model].show = c[model].show.concat(Array.isArray(show) ? show : [show]);
              return c;
            }, {}));
          }
        }), r
      }, {})

      //make a JSON array for a html display removing empty values.
      var displayList = []
      Object.keys(uniqueList).forEach(function (key) {
        var filtered = uniqueList[key].filter(function (elem) {
          return (elem['model'] && elem['model'].length > 0);
        });
        displayList.push({ make: key, modelShowList: filtered })
      });

      //sort the json array alphabetically.
      var sortedList = displayList.sort(function (a, b) {
        if (a.make > b.make) {
          return 1;
        }
        if (a.make < b.make) {
          return -1;
        }
        return 0;
      });
      this.carModelShowList = sortedList;
    });

  }



}
