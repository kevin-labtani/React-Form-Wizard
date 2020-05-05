## How to install Prettier and ESLint with airbnb rules

[ESLint](https://eslint.org/) for Code-quality rules
[Prettier](https://prettier.io/) for Formatting rules

It's best to install ESLint nad Prettier locally in each project as it's easier to have different rulesets for different projects.

1. install the **Prettier** and **ESLint** VSCode extensions
1. `npm init -y` in local project
1. `npm install --save-dev prettier`
1. `npm install --save-dev eslint`
1. make a Formatting rulesprettier config file `touch .prettierrc`

   ```json
   {
     "semi": true,
     "trailingComma": "all",
     "singleQuote": false,
     "printWidth": 80,
     "tabWidth": 2
   }
   ```

1. `npm install --save-dev eslint-config-prettier eslint-plugin-prettier`
1. make an eslint config `touch .eslintrc.json`

   ```json
   {
     "extends": ["prettier"],
     "plugins": ["prettier"],
     "rules": {
       "prettier/prettier": ["error"]
     }
   }
   ```

1. create an ignore file for files you want to ignore `.eslintignore`
1. `npx install-peerdeps --dev eslint-config-airbnb`  
    change `.eslintrc.json` to

   ```json
   {
     "env": {
       "browser": true,
       "es6": true,
       "node": true
     },
     "extends": ["airbnb", "prettier"],
     "plugins": ["prettier"],
     "rules": {
       "prettier/prettier": ["error"]
     }
   }
   ```

alternatively, running `npx eslint --init` also an option to setup eslint

## For PHP

[PHP CS Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer)

1.  install the **PHP CS Fixer** extension to VSCode
1.  add to VSCode `settings.json`
    ```json
      "[php]": {
      "editor.defaultFormatter": "junstyle.php-cs-fixer",
      },
      "php.suggest.basic": false,
      "php-cs-fixer.rules": "@PhpCsFixer",
      "php-cs-fixer.onsave": true,
    ```
