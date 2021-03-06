# FormeroWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Project features & TODOs

**Must have:**

- add block type for global validations
- calculations
- layout
- scroll to error field
- posts stored as rows in database
- QR code for payment
- email a PDF with QR code
- sanitize inputs FE/BE

**Optional:**

- server field errors
- non-linear form flows
- log all things
- revision of form status flow (init|initialized|error...)
- a standalone checkbox - use as agreement checkbox (option)
- multipart forms
- multiple forms
- generate PDF with filled information
- statistics (with generated PDF for a download)
- email with counts per day
- join firstName and lastName to the table
- tests

**Todo**

- upgrade Angular version
- refactor
  - fields -> formBlocks

**Fix**

- edit batch form messes up total sum
- multiple global validators of same kind on one form
- find places and refactor with deep copy

## UI/Layout

- Ant design https://ng.ant.design/docs/introduce/en
- Material design https://material.angular.io/
- NGX-Bootstrap https://valor-software.com/ngx-bootstrap/#/

## Tools & Tech stack

- GraphQL
- Prettier https://medium.com/@victormejia/setting-up-prettier-in-an-angular-cli-project-2f50c3b9a537
