# README

## RoR gem dependencies

### Gems installation

Install all the gems required by running:

```
$ bundle install
```

### Gems

**fast_jsonapi**
Used for te creation and manipulation of JSON in the rails API. [Github](https://github.com/Netflix/fast_jsonapi)

**email_validator**
Used to validate the email entry by the Rails model. [Github](https://github.com/K-and-R/email_validator)

**Audited**
This project requires the installation of the [audited](https://github.com/collectiveidea/audited) gem to implement the 'Edits History' feature.

For that please run the following commands to install the gem and start the DB migration:

```
$ rails generate audited:install
$ rake db:migrate
```

## React library dependencies

**Axios**
Used for managing REST requests in React. [Github](https://github.com/axios/axios)

**React-Router-Dom**
React Router DOM enables you to implement dynamic routing in a web app. [More Info](https://reactrouter.com/web/guides/quick-start)
