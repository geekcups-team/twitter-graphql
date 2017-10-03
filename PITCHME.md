# REST in peace
## come rimpiazzare un'architettura REST

---

# Agenda

* Dove vogliamo arrivare
* Cos'è GraphQL
* Killer app
* Backend in nodeJS
* Frontend in React + Relay

---

# Obiettivo

## Vogliamo creare un mini clone di Twitter

[Twitter Geekcups](http://twitter.geekcups.com)

---

## In REST avremmo ~

```
 GET /api/v1/me
[GET] /api/v1/me/feed
[GET] /api/v1/me/suggestedUsers
 GET /api/v1/user/:userId/tweets
 POST /api/v1/tweets
 POST /api/v1/tweets/:tweetId/likes
 DELETE /api/v1/tweets/:tweetId/likes
```

---

## Cos'è GraphQL

### è un Query Language (QL) per recuperare dati, come SQL.
### Non è quindi specifico per un particolare linguaggio, framework o storage.

---

## Implementazione server GraphQL

### Ha solitamente un unico endpoint dove vengono eseguite tutte le query.
### Non esistono verbi o resources come in un architettura REST.

---

## La struttura GraphQL

### La struttura dati da interrogare è un *grafo*<br> le cui foglie sono istanze di diversi *types*<br> composti a loro volta di *fields*
---

## Types e Fields

```
type Tweet {
  id: ID!
  text: String!
  likeCount: Int!
  createAt: DateTime!
  user: User!
}

type User {
  id: ID!
  name: String!
  tweets: [Tweet]
  ...
}
```

---

## Il Viewer

### è un *type* particolare che non è definito nelle specifiche di GraphQL, ma viene usato per convenzione per identificare *chi sta guardando il grafo*

---

## Il Viewer

```
type Viewer {
  id: ID!
  feed: [Tweet]
  suggestedUsers: [User]
  ...
}
```

---

## Arguments

### Ogni field, oltre a definire il tipo, può definire degli argomenti opzionali

```
type Viewer {
  ...
  user(id: ID!): User!
  ...
}
```

---

## Come accedere al grafo

* Query - recupero nodi<br>
 (*ex GET*)

* Mutation - modifica nodi<br>
 (*ex POST/PUT/PATCH/DELETE*)

* Subscription - recupero dati real-time<br>
 (*ex websocket*)

---

## Come risponde il server

#### Data una query GraphQL, il server risponde esattamente quello che gli è stato chiesto

---

## Request
```
{
  viewer {
    id
    me {
      name
      bio
    }
  }
}
```

---

## Response
```
{
  "data": {
    "viewer": {
      "id": "fREWISDAfMVASERWQç=",
      "me": {
        "name": "Albano Carrisi",
        "bio": "Felicità"
      }
    }
  }
}

```
---

## Fragments

### Sono utilizzati per raggruppare i fields richiesti su un particolare type

---

## Esempio Fragment
```
{
  viewer {
    suggestedUser {
      ...infoUser
    }
    me {
      ...infoUser
    }
  }
}

fragment infoUser on User {
  name
  bio
}
```

---

## Killer app

### Graph*i*QL
![Graphiql](https://avatars2.githubusercontent.com/u/12972006?v=4&s=400)
